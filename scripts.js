document.addEventListener('DOMContentLoaded', () => {
    let favorites = [];

    const dishPrices = [2.99, 3.90, 11.40, 5.50, 7.25, 4.80, 6.30, 8.15, 9.99];

    const mainContainer = document.querySelector('main');

    const summarySection = document.createElement('article');
    summarySection.classList.add('restaurant');

    const summaryTitle = document.createElement('h3');
    summaryTitle.textContent = 'Favorites';

    const summaryList = document.createElement('div');


    const summaryTotal = document.createElement('h3');
    summaryTotal.textContent = 'Total: $0.00';


    summarySection.appendChild(summaryTitle);
    summarySection.appendChild(summaryList);
    summarySection.appendChild(summaryTotal);
    mainContainer.appendChild(summarySection);

    const dishCards = document.querySelectorAll('.dish-card');

    dishCards.forEach((card, index) => {
        const contentDiv = card.querySelector('.card-content');
        const dishName = card.querySelector('.card-title').textContent;
        const price = dishPrices[index];

        card.dataset.id = `dish-${index}`;
        card.dataset.name = dishName;
        card.dataset.price = price;

        const priceTag = document.createElement('p');
        priceTag.textContent = `Price: $${price.toFixed(2)}`;
        contentDiv.appendChild(priceTag);

        const favButton = document.createElement('button');
        favButton.textContent = 'Add as Favorite';
        favButton.classList.add('fav-btn');
        contentDiv.appendChild(favButton);

        /** Update favorite button and add favorited items to favorites array when favButton is clicked */
        favButton.addEventListener('click', () => {
            const isFavorite = card.classList.contains('favorited-dish');

            if (!isFavorite) {
                card.classList.add('favorited-dish');
                favButton.textContent = 'Remove From Favorites'
                favButton.classList.add('remove-btn-state');

                favorites.push({
                    id: card.dataset.id,
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price)
                });

            } else {
                card.classList.remove('favorited-dish');
                favButton.textContent = 'Add as Favorite';
                favButton.classList.remove('remove-btn-state');

                favorites = favorites.filter(fav => fav.id !== card.dataset.id);
            }
            updateSummaryDisplay();
        });
    });

    /** Updates the favorites summary display (items and total price) */
    function updateSummaryDisplay() {
        while (summaryList.firstChild) {
            summaryList.removeChild(summaryList.firstChild);
        }

        let total = 0;
        favorites.forEach(fav => {
            const listItem = document.createElement('div');
            listItem.textContent = `${fav.name}`;
            listItem.classList.add('summary-item');
            summaryList.appendChild(listItem);

            total += fav.price;
        });

        summaryTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

});

