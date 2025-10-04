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

document.querySelectorAll('#category-list a').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault()
    const targetCategoryId = this.getAttribute('href').substring(1)
    const targetCategory = document.getElementById(targetCategoryId)

    targetCategory.scrollIntoView({ behavior: 'smooth' })

    document
      .querySelectorAll('#category-list a')
      .forEach((l) => l.classList.remove('active-category'))

    this.classList.add('active-category')
  })
})

document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase()
  const products = document.querySelectorAll('.product-item')

  products.forEach((product) => {
    const productName = product.querySelector('h3').textContent.toLowerCase()
    const productDescription = product.querySelector('p').textContent.toLowerCase()

    if (productName.includes(query) || productDescription.includes(query)) {
      product.style.display = ''
    } else {
      product.style.display = 'none'
    }
  })
})
