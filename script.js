 document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[name="bundle"]');
    const totalAmountEl = document.getElementById('total-amount');
    const generateSelectors = (wrapper) => {
        const selectorContainer = wrapper.querySelector('.item-selectors');
        if (!selectorContainer) return;
        selectorContainer.innerHTML = '';
        const radio = wrapper.querySelector('input[type="radio"]');
        const numPairs = parseInt(radio.dataset.pairs, 10);
        if (numPairs > 0) {
            const headerRow = document.createElement('div');
            headerRow.className = 'item-selector-header-row';
            headerRow.innerHTML = `
                <span class="header-label placeholder"></span>
                <span class="header-label">Size</span>
                <span class="header-label">Colour</span>
            `;
            selectorContainer.appendChild(headerRow);
        }
        for (let i = 1; i <= numPairs; i++) {
            const row = document.createElement('div');
            row.className = 'item-selector-row';

            row.innerHTML = `
                <span class="item-label">#${i}</span>
                <select name="size-${i}">
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                </select>
                <select name="color-${i}">
                    <option value="colour">colour</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="grey">Grey</option>
                </select>
            `;
            selectorContainer.appendChild(row);
        }
    };
    const updateSelection = (selectedRadio) => {
        const price = parseFloat(selectedRadio.value).toFixed(2);
        totalAmountEl.textContent = price;
        const parentWrapper = selectedRadio.closest('.bundle-option-wrapper');
        generateSelectors(parentWrapper);
    };
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            updateSelection(event.target);
        });
    });
    const initiallyChecked = document.querySelector('input[name="bundle"]:checked');
    if (initiallyChecked) {
        updateSelection(initiallyChecked);
    }
});