// Função para detectar a categoria visível na tela
document.addEventListener('scroll', function () {
  const categories = document.querySelectorAll('.category-section')
  const categoryLinks = document.querySelectorAll('#category-list a')

  let activeCategory = null

  categories.forEach((category) => {
    const rect = category.getBoundingClientRect()
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      activeCategory = category
    }
  })

  if (activeCategory) {
    const activeCategoryId = activeCategory.getAttribute('id')

    categoryLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${activeCategoryId}`) {
        link.classList.add('active-category')
      } else {
        link.classList.remove('active-category')
      }
    })
  }
})

// Função para rolar até a categoria clicada
document.querySelectorAll('#category-list a').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault()
    const targetCategoryId = this.getAttribute('href').substring(1)
    const targetCategory = document.getElementById(targetCategoryId)

    // Rola suavemente até a categoria clicada
    targetCategory.scrollIntoView({ behavior: 'smooth' })

    // Remove a classe 'active' de todos os links
    document
      .querySelectorAll('#category-list a')
      .forEach((l) => l.classList.remove('active-category'))

    // Adiciona a classe 'active' ao link clicado
    this.classList.add('active-category')
  })
})

// Filtra os produtos com base na pesquisa
document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase() // Captura o texto digitado
  const products = document.querySelectorAll('.product-item') // Seleciona todos os produtos

  products.forEach((product) => {
    const productName = product.querySelector('h3').textContent.toLowerCase() // Nome do produto
    const productDescription = product.querySelector('p').textContent.toLowerCase() // Descrição do produto

    // Verifica se o nome ou descrição contém a consulta de pesquisa
    if (productName.includes(query) || productDescription.includes(query)) {
      product.style.display = '' // Exibe o produto
    } else {
      product.style.display = 'none' // Oculta o produto
    }
  })
})
