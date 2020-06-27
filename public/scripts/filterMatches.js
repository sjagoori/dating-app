const matchesContainer = document.getElementById('matches-container');

const knownFilter = 'Javascript';
const interestFilter = 'Java';

// for (const child of matchesContainer.children) {
//     const knownLanguagesElement = child.getElementsByClassName("knownLanguages")[0].children;
//     const interestLanguagesElement = child.getElementsByClassName("interestLanguages")[0].children;
//     const knownLanguages = [].slice.call(knownLanguagesElement).map(language => language.textContent.trim());
//     const interestLanguages = [].slice.call(interestLanguagesElement).map(language => language.textContent.trim());


//     if (!knownLanguages.includes(knownFilter)) {
//         child.remove();
//     }

//     if (!interestLanguages.includes(interestFilter)) {
//         child.remove();
//     }
// }

function updateKnownLanguageFilter() {
    const knownLanguageSelect = document.getElementById("knownLanguageFilter");
    const selectedValue = knownLanguageSelect.options[knownLanguageSelect.selectedIndex].value;

    for (const child of matchesContainer.children) {
        if (selectedValue !== "") {

            const knownLanguagesElement = child.getElementsByClassName("knownLanguages")[0].children;
            const knownLanguages = [].slice.call(knownLanguagesElement).map(language => language.textContent.trim());

            if (knownLanguages.includes(selectedValue)) {
                child.style.display = "block";
            } else {
                child.style.display = "none";
            }
        } else {
            child.style.display = "block";
        }
    }
}

function updateInterestLanguageFilter() {
    const interestLanguagesSelect = document.getElementById("interestLanguageFilter");
    const selectedValue = interestLanguagesSelect.options[interestLanguagesSelect.selectedIndex].value;

    for (const child of matchesContainer.children) {
        if (selectedValue !== "") {

            const interestLanguagesElement = child.getElementsByClassName("interestLanguages")[0].children;
            const interestLanguages = [].slice.call(interestLanguagesElement).map(language => language.textContent.trim());

            if (interestLanguages.includes(selectedValue)) {
                child.style.display = "block";
            } else {
                child.style.display = "none";
            }
        } else {
            child.style.display = "block";
        }
    }
}
