// Classe principal do navbar
class ModernNavbar {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.hamburger = document.getElementById("hamburger")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.isMenuOpen = false
    this.scrollThreshold = 50

    this.init()
  }

  // Inicialização: configura todos os eventos
  init() {
    this.bindEvents()
    this.setupIntersectionObserver()
    this.addKeyboardNavigation()
  }

  // Eventos: configura todos os listeners
  bindEvents() {
    // Toggle do menu mobile
    this.hamburger.addEventListener("click", (e) => {
      e.preventDefault()
      this.toggleMobileMenu()
    })

    // Fecha menu ao clicar nos links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.isMenuOpen) {
          this.closeMobileMenu()
        }
      })
    })

    // Efeito de scroll com throttling
    let scrollTimeout
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(() => {
        this.handleScroll()
      }, 10)
    })

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        this.handleSmoothScroll(e, anchor)
      })
    })

    // Efeitos hover nos links
    this.navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        this.addHoverEffect(link)
      })

      link.addEventListener("mouseleave", () => {
        this.removeHoverEffect(link)
      })
    })

    // Fecha menu com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMobileMenu()
      }
    })

    // Fecha menu clicando fora
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  // Menu mobile: abre/fecha
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen
    this.hamburger.classList.toggle("active")
    this.navMenu.classList.toggle("active")

    // Previne scroll do body quando menu aberto
    document.body.style.overflow = this.isMenuOpen ? "hidden" : ""

    // Anima itens do menu
    if (this.isMenuOpen) {
      this.animateMenuItems()
    }
  }

  // Menu mobile: fecha
  closeMobileMenu() {
    this.isMenuOpen = false
    this.hamburger.classList.remove("active")
    this.navMenu.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Animação: itens do menu mobile
  animateMenuItems() {
    const menuItems = this.navMenu.querySelectorAll(".nav-item")
    menuItems.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateY(20px)"

      setTimeout(() => {
        item.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  // Scroll: efeito no navbar
  handleScroll() {
    const scrollY = window.scrollY

    if (scrollY > this.scrollThreshold) {
      this.navbar.classList.add("scrolled")
    } else {
      this.navbar.classList.remove("scrolled")
    }

    // Efeito parallax sutil
    const parallaxOffset = scrollY * 0.1
    this.navbar.style.transform = `translateY(${Math.min(parallaxOffset, 10)}px)`
  }

  // Scroll suave: navegação por âncoras
  handleSmoothScroll(e, anchor) {
    e.preventDefault()
    const targetId = anchor.getAttribute("href")
    const target = document.querySelector(targetId)

    if (target) {
      const offsetTop = target.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Hover: adiciona efeito
  addHoverEffect(link) {
    link.style.transform = "translateY(-3px)"
    link.style.textShadow = "0 4px 8px rgba(190, 18, 60, 0.2)"
  }

  // Hover: remove efeito
  removeHoverEffect(link) {
    link.style.transform = "translateY(0)"
    link.style.textShadow = "none"
  }

  // Observer: animações de entrada
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)
  }

  // Navegação: suporte ao teclado
  addKeyboardNavigation() {
    this.navLinks.forEach((link, index) => {
      link.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault()
          const nextIndex = (index + 1) % this.navLinks.length
          this.navLinks[nextIndex].focus()
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault()
          const prevIndex = index === 0 ? this.navLinks.length - 1 : index - 1
          this.navLinks[prevIndex].focus()
        }
      })
    })
  }
}

// Inicialização: quando DOM carregado
document.addEventListener("DOMContentLoaded", () => {
  new ModernNavbar()
})

// Animação de carregamento
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})
