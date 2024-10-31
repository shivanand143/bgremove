document.getElementById("remove-bg-btn").onclick = async function() {
    const fileInput = document.getElementById("image-upload");
    const outputImage = document.getElementById("output-image");

    if (!fileInput.files.length) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    this.disabled = true;
    this.textContent = "Processing...";

    const response = await fetch("/remove-background", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        outputImage.src = URL.createObjectURL(blob);
        outputImage.style.display = "block";
    } else {
        alert("Failed to process image. Please try again.");
    }

    this.disabled = false;
    this.textContent = "Remove Background";
};
