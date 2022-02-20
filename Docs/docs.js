const setTheme = () => {
    let isDarkModeSelected = localStorage.getItem('isDarkMode');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if(isDarkModeSelected===undefined){
        localStorage.setItem('isDarkMode',false)
    } else{
        if(isDarkModeSelected === 'true'){
            document.body.className = '';
            themeToggleBtn.children[0].classList.replace('fa-moon','fa-sun')
            document.body.classList.add('dark-mode');
        } else {
            themeToggleBtn.children[0].classList.replace('fa-sun','fa-moon')
            document.body.className = ''
        }
    }
}

//To toggle the main sidebar
try {
    const mainSidebar = document.querySelector("aside.tr-drawer-modal");
    const hamburgers = document.querySelectorAll(".hamburger");

    hamburgers.forEach(btn => btn.addEventListener('click', e => {
        let toggleTarget = document.getElementById(btn.getAttribute('data-target'));
        toggleTarget.classList.toggle('active');

        if (toggleTarget.className.includes('tr-drawer-modal')) {
            toggleTarget.parentElement.classList.toggle('active') //To activate the BG overlay
        }
        e.stopPropagation();
    }))

    mainSidebar.addEventListener('click', e => {
        e.stopPropagation(); // make sure the eventlistener on the body is not triggered when anything on the sidebar is clicked
    });

    document.body.addEventListener('click', (e) => {
        if (mainSidebar.className.includes('tr-drawer-modal')) {
            mainSidebar.classList.remove('active')
            mainSidebar.parentElement.classList.remove('active');
        }
    })

} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}

//To Toggle the color theme
try{
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    themeToggleBtn.addEventListener('click', ()=> {
        let isDarkModeSelected = localStorage.getItem('isDarkMode');
        isDarkModeSelected =  isDarkModeSelected === 'false' ? true : false;
        
        localStorage.isDarkMode = isDarkModeSelected;
        setTheme();
    })
} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}


//Toggle different variants of the component
try {
    const toggleVariantBtns = document.querySelectorAll('.toggle-variant-btn');
    const tabToggleBtns = document.querySelectorAll('.main-demo-content .tabs-btn-list .tr-btn');
    let currentActiveBlock = 1;


    let hideCurrentActiveBlocks = blockNumber => {
        document.getElementById(`preview-block-${blockNumber}`).classList.add('hide');
        document.getElementById(`code-block-${blockNumber}`).classList.add('hide');
    }

    let showBlocks = blockNumber => {
        document.getElementById(`preview-block-${blockNumber}`).classList.remove('hide');
        document.getElementById(`code-block-${blockNumber}`).classList.remove('hide');
    }

    toggleVariantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let targetBlockNumber = btn.getAttribute('data-target');
            hideCurrentActiveBlocks(currentActiveBlock);
            showBlocks(targetBlockNumber);
            currentActiveBlock = targetBlockNumber;

            document.querySelector('.toggle-variant-btn.active').classList.remove('active'); //remove active from current active btn
            btn.classList.add('active');
        })
    })
} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}

// Toggle between preview and code blocks
try {
    let currentActiveTab = document.getElementById('preview-blocks');
    let currentActiveTabBtn = document.querySelectorAll('.tabs-btn-list .tr-btn')[0];
    const tabBtnWrapper = document.querySelector(".tabs-btn-list");
    const buttonBottomBorder = document.querySelector('.tabs-btn-list .bottom-border');
    let moveBorderBy = 0;

    tabBtnWrapper.addEventListener('click', e => {
        if (e.target.className.includes('tr-btn') && e.target !== currentActiveTabBtn) {

            const targetTab = document.getElementById(e.target.getAttribute('data-target'));
            currentActiveTab.classList.add('hide');
            targetTab.classList.remove('hide');

            currentActiveTabBtn.classList.remove('active');
            e.target.classList.add('active');

            //Move the bottom border
            moveBorderBy = ++moveBorderBy % 2;
            buttonBottomBorder.style.transform = `translateX(${moveBorderBy * 100}%)`;

            currentActiveTab = targetTab;
            currentActiveTabBtn = e.target;
        }
    })

} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}


// Button to copy the text of code block
try {
    const copyButton = document.querySelector('.copy-btn');
    const codBlocks = document.querySelectorAll('.code-block');
    copyButton.addEventListener('click', () => {
        codBlocks.forEach(block => {
            if (!block.className.includes('hide')) {
                var range = document.createRange();
                range.selectNode(block);
                window.getSelection().removeAllRanges(); // clear current selection
                window.getSelection().addRange(range); // to select text
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
            }
        })
    })

} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}

// Highlighting the code snippets
try {
    hljs.highlightAll();
    const codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach((codeBlock) => {
        let code = codeBlock.innerHTML;
        code = code.replaceAll("<", "&LT");
        codeBlock.innerHTML = code;
    });
} catch (err) {
    if (err.message.includes('Cannot read properties of null')) console.error(err);
    else throw err;
}

document.onload = setTheme();