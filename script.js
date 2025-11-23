document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const globalPassInput = document.getElementById('globalPass');
    
    const btnExtract = document.getElementById('btnExtract');
    const btnClear = document.getElementById('btnClear'); // New Button
    const btnCopy = document.getElementById('btnCopy');
    const status = document.getElementById('status');

    // --- 1. FORMAT DATA ---
    btnExtract.addEventListener('click', () => {
        const text = inputBox.value.trim();
        const password = globalPassInput.value.trim();

        if (!text) {
            status.innerText = "Please paste cookies first!";
            status.style.color = "red";
            return;
        }
        
        const passStr = password ? password : ""; 

        const lines = text.split('\n');
        let formattedLines = [];
        let count = 0;

        lines.forEach(line => {
            const cleanLine = line.trim();
            if (!cleanLine) return;

            // c_user বা UID খোঁজা
            const match = cleanLine.match(/c_user=([0-9]+)/);
            
            if (match && match[1]) {
                const uid = match[1];
                formattedLines.push(`${uid} | ${passStr} | ${cleanLine}`);
                count++;
            }
        });

        if (count > 0) {
            outputBox.value = formattedLines.join('\n');
            status.innerText = `Success! Formatted ${count} lines.`;
            status.style.color = "green";
            btnCopy.style.display = "block";
        } else {
            outputBox.value = "";
            status.innerText = "No c_user found in text.";
            status.style.color = "red";
            btnCopy.style.display = "none";
        }
    });

    // --- 2. CLEAR DATA (New) ---
    btnClear.addEventListener('click', () => {
        inputBox.value = "";
        outputBox.value = "";
        // পাসওয়ার্ড মুছবে না, যাতে বারবার লিখতে না হয়
        // যদি পাসওয়ার্ডও মুছতে চান, নিচের লাইনটি আনকমেন্ট করুন:
        // globalPassInput.value = ""; 
        
        status.innerText = "All Cleared! Ready.";
        status.style.color = "#333";
        btnCopy.style.display = "none";
        inputBox.focus();
    });

    // --- 3. COPY DATA ---
    btnCopy.addEventListener('click', () => {
        outputBox.select();
        outputBox.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(outputBox.value).then(() => {
            status.innerText = "Copied to Clipboard! ✅";
        });
    });
});
