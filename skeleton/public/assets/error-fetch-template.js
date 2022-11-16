window.getCode = (() => {
    const cache = {};

    function selectLine(viewcode, lines) {
        hljs.lineNumbersBlock(viewcode);
        setTimeout(() => {
            const checks = document.querySelectorAll(`.hljs-ln-line[data-line-number="${lines.shift()}"]`);
            checks.forEach(td => {
                td.style.background = 'rgb(255 69 69 / 71%)'
            });
        }, 200);
    }

    return function getCode(file, lines) {
        const viewcode = document.querySelector(".view-code pre");
        
        if (!(file in cache)) cache[file] = null;

        if (
            file.includes(".js") &&
            file.startsWith("/") &&
            cache[file] === null
        ) {
            fetch(file)
                .then((res) => res.text())
                .then((text) => {
                    viewcode.innerHTML = cache[file] = hljs.highlight(text, {
                        language: "typescript",
                    }).value;
                    selectLine(viewcode, lines.split(':'))
                });
        } else if (cache[file]) {
            viewcode.innerHTML = cache[file];
            selectLine(viewcode, lines.split(':'))
        }
    };
})();
