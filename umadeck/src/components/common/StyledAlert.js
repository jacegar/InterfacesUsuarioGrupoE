export function showStyledAlert(message) {
        const alertDiv = document.createElement("div");
        alertDiv.textContent = message;
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translateX(-50%)";
        alertDiv.style.backgroundColor = "#f8d7da";
        alertDiv.style.color = "#721c24";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.border = "1px solid #f5c6cb";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        alertDiv.style.zIndex = "1000";
        alertDiv.style.fontSize = "23px";
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }