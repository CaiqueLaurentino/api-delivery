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
