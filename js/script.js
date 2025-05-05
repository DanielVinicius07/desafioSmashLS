const messageArea = document.getElementById("messageArea");
const fileList = document.getElementById("fileList");
const MAX_SIZE_MB = 5;

function showMessage(msg, type = "success") {
    messageArea.textContent = msg;
    messageArea.style.color = type === "error" ? "#e63946" : "#2a9d8f";
}

function upload () {
    const input = document.getElementById("uploadInput");
    const files = [...input.files];

    if (files.length === 0) {
        showMessage("Nenhum arquivo selecionado.", "error");
        return;
    }

    const oversized = files.find(file => file.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
        showMessage (`Arquivo ${oversized.name} excede 5MB.`, "error");
        return;
    }

    showMessage("Enviando...", "success")

    const su = new SmashUploader ({
        region: "us-east-1",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2YTUyMDFiLTUxMjItNDgwZC05YzRhLTQ0YWEzODdiNDg4MC1ldSIsInVzZXJuYW1lIjoiNzZhNWViOTctZWNiNy00MmNiLTk5MjUtMjFmNDViYzJmMzJlIiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIyMDEuMjAuMTEwLjI0MiIsInNjb3BlIjoiTm9uZSIsImFjY291bnQiOiJhMTFkZTllYy1kMjM3LTQ2ODEtOTY0NS03OTViMDA4ZjM0ZDUtZWEiLCJpYXQiOjE3NDYwNDkxMjEsImV4cCI6NDkwMTgwOTEyMX0.4Pn0ucwaezK4aEY3oWK2M9y-_Sb68WydEg6SrlMBYGA",
    });

    su.upload({ files })
    .then(result => {
        const link = result?.transfer?.transferUrl;

        if (link) {
            showMessage("Upload concluído!", "success");
    
           files.forEach(file=> {
            const li = document.createElement("li");
            li.innerHTML = `
            ${file.name} —
            <a href= "${link}" target="_blank"; ">Baixar</a>`; 
            fileList.appendChild(li);
           });
        } else {
            showMessage("Upload concluído, mas sem link.", "error");
        }
    })

    .catch(error=> {
        console.error("Error:", error);
        showMessage("Erro ao enviar o arquivo.", "error");
    });

}