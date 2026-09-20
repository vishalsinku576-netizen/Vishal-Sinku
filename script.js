const { jsPDF } = window.jspdf;


/* ================= ELEMENTS ================= */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const imageInput = document.getElementById("imageInput");
const cameraBtn = document.getElementById("cameraBtn");

const preview = document.getElementById("preview");
const imageCount = document.getElementById("imageCount");

const clearBtn = document.getElementById("clearBtn");
const convertBtn = document.getElementById("convertBtn");

const status = document.getElementById("status");


let images = [];


/* ================= SIDEBAR ================= */

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("active");

    overlay.classList.add("active");

});


closeBtn.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);


function closeSidebar() {

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}


/* ================= IMAGE SELECT ================= */

imageInput.addEventListener("change", function () {

    const selectedFiles = Array.from(this.files);

    selectedFiles.forEach(file => {

        if (
            file.type === "image/jpeg" ||
            file.type === "image/png"
        ) {

            images.push(file);

        }

    });

    renderImages();

    this.value = "";

});


/* CAMERA */

cameraBtn.addEventListener("click", () => {

    imageInput.setAttribute("capture", "environment");

    imageInput.click();

});


/* ================= RENDER IMAGES ================= */

function renderImages() {

    preview.innerHTML = "";

    imageCount.textContent =
        `${images.length} image${images.length !== 1 ? "s" : ""}`;


    if (images.length === 0) {

        preview.innerHTML = `

            <div class="empty">

                <div>🖼️</div>

                <h3>No images selected</h3>

                <p>
                    Add images to start creating your PDF
                </p>

            </div>

        `;

        return;
    }


    images.forEach((file, index) => {

        const reader = new FileReader();

        reader.onload = function(e) {

            const item = document.createElement("div");

            item.className = "preview-item";

            item.innerHTML = `

                <img
                    src="${e.target.result}"
                    alt="Image ${index + 1}"
                >

                <span class="image-number">
                    ${index + 1}
                </span>

                <button
                    class="remove-image"
                    onclick="removeImage(${index})"
                >
                    ×
                </button>

            `;

            preview.appendChild(item);

        };

        reader.readAsDataURL(file);

    });

}


/* ================= REMOVE ================= */

function removeImage(index) {

    images.splice(index, 1);

    renderImages();

}


/* ================= CLEAR ================= */

clearBtn.addEventListener("click", () => {

    images = [];

    renderImages();

    status.textContent = "";

});


/* ================= FILE READER ================= */

function readFile(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}


/* ================= IMAGE LOAD ================= */

function loadImage(src) {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.onload = () => resolve(image);

        image.onerror = reject;

        image.src = src;

    });

}


/* ================= CONVERT ================= */

convertBtn.addEventListener("click", async () => {

    if (images.length === 0) {

        alert("Please select at least one image.");

        return;

    }


    status.textContent =
        "Creating your PDF...";


    const pageSize =
        document.getElementById("pageSize").value;

    const orientation =
        document.getElementById("orientation").value;

    const margin =
        Number(document.getElementById("margin").value);

    const quality =
        Number(document.getElementById("quality").value);


    const pdf = new jsPDF({

        orientation: orientation,

        unit: "mm",

        format: pageSize

    });


    for (let i = 0; i < images.length; i++) {

        if (i > 0) {

            pdf.addPage(
                pageSize,
                orientation
            );

        }


        const imageData =
            await readFile(images[i]);


        const img =
            await loadImage(imageData);


        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();


        const maxWidth =
            pageWidth - margin * 2;

        const maxHeight =
            pageHeight - margin * 2;


        let width =
            img.width;

        let height =
            img.height;


        const ratio =
            Math.min(
                maxWidth / width,
                maxHeight / height
            );


        width *= ratio;
        height *= ratio;


        const x =
            (pageWidth - width) / 2;

        const y =
            (pageHeight - height) / 2;


        let format = "JPEG";


        if (
            images[i].type === "image/png"
        ) {

            format = "PNG";

        }


        pdf.addImage(

            imageData,

            format,

            x,
            y,

            width,
            height,

            undefined,

            "FAST",

            0

        );

    }


    pdf.save("Image2PDF-document.pdf");


    status.textContent =
        "✅ PDF created successfully!";

});


/* ================= MENU ITEMS ================= */

document.querySelectorAll(".menu-item")
.forEach(item => {

    item.addEventListener("click", () => {

        if (
            item.classList.contains("tool-link")
        ) {

            closeSidebar();

            window.scrollTo({

                top: document.body.scrollHeight,

                behavior: "smooth"

            });

        }

    });

});