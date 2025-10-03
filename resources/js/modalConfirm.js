// Função para capturar o clique no botão "Adicionar"
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault()

    // Captura os dados do produto
    const productData = {
      id: this.getAttribute('data-id'),
      name: this.getAttribute('data-name'),
      price: parseFloat(this.getAttribute('data-price')),
      image: { url: this.getAttribute('data-image') },
      description: this.getAttribute('data-description'),
      restricted_ingredients: this.getAttribute('data-restricted'),
    }

    // Chama a função que configura o modal
    setupModal(productData)
    document.getElementById('confirm-modal').classList.remove('hidden')
  })
})

// Função que configura o modal com os dados do produto
function setupModal(product) {
  document.getElementById('modal-product-name').textContent = product.name
  document.getElementById('modal-product-price').textContent = product.price.toFixed(2)
  document.getElementById('modal-product-image').src = product.image.url
  document.getElementById('modal-product-description').textContent =
    product.description || 'Sem descrição disponível.'

  const ingredientsContainer = document.getElementById('restricted-ingredients-list')
  ingredientsContainer.innerHTML = '' // Limpa a lista anterior
  if (product.restricted_ingredients && product.restricted_ingredients.length > 0) {
    product.restricted_ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li')
      listItem.textContent = `${ingredient.name} - R$ ${ingredient.additional_price}`
      ingredientsContainer.appendChild(listItem)
    })
  } else {
    const noRestrictions = document.createElement('li')
    noRestrictions.textContent = 'Sem ingredientes restritos'
    ingredientsContainer.appendChild(noRestrictions)
  }
}

// Função para fechar o modal
document.getElementById('close-modal').addEventListener('click', function () {
  document.getElementById('confirm-modal').classList.add('hidden')
})
