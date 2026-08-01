import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Mail,
  MapPin,
  Menu,
  Play,
  X,
} from 'lucide-react'

const navSections = [
  { id: 'village', label: 'Village', title: 'Village Map' },
  { id: 'well', label: 'Well', title: 'A Day at the Well' },
  { id: 'banyan', label: 'Banyan', title: 'Under the Banyan' },
  { id: 'crafts', label: 'Crafts', title: 'Hands that Build' },
  { id: 'fields', label: 'Seasons', title: 'Fields and Seasons' },
  { id: 'water', label: 'Water', title: 'Water and Rest' },
  { id: 'guard', label: 'Guard', title: 'Guarding the Village' },
  { id: 'festival', label: 'Festival', title: 'When the Village Celebrates' },
]

const navGroups = [
  {
    label: 'The Village',
    links: [
      { label: 'Layout Map', href: '#village' },
      { label: 'History', href: '#well' },
    ],
  },
  {
    label: 'Life Here',
    links: [
      { label: 'Daily Routines', href: '#well' },
      { label: 'Festivals', href: '#festival' },
      { label: 'Trades & Crafts', href: '#crafts' },
    ],
  },
  {
    label: 'Explore',
    links: [
      { label: 'Landmarks', href: '#village' },
      { label: 'Nature', href: '#water' },
      { label: 'Gallery', href: '#festival' },
    ],
  },
  {
    label: 'Visit',
    links: [
      { label: 'Plan a Visit', href: '#visit' },
      { label: 'Contact', href: '#visit' },
    ],
  },
]

const baseLandmarks = [
  { id: 'gate', name: 'Village Entrance Gate', label: 'Gate', category: 'gate', description: 'Bright marigold torans and bells welcome travelers into the settlement.', top: '12%', left: '12%' },
  { id: 'road', name: 'Main Dirt Road', label: 'Road', category: 'road', description: 'The winding artery linking houses, shops, and the central gathering spaces.', top: '28%', left: '24%' },
  { id: 'houses', name: 'Mud Houses', label: 'Houses', category: 'houses', description: 'Thatched mud homes with courtyards and small vegetable plots nearby.', top: '48%', left: '18%' },
  { id: 'banyan', name: 'Central Banyan Tree', label: 'Tree', category: 'tree', description: 'A social heart where elders sit, stories are told, and children gather.', top: '42%', left: '43%' },
  { id: 'temple', name: 'Small Temple', label: 'Temple', category: 'temple', description: 'A modest shrine where lamp smoke and bells drift through the morning air.', top: '24%', left: '56%' },
  { id: 'well', name: 'Village Well', label: 'Well', category: 'well', description: 'Stone-lined and rope-pulled, the well gathers the village at dawn.', top: '58%', left: '58%' },
  { id: 'pond', name: 'Pond or Water Tank', label: 'Pond', category: 'pond', description: 'Used for bathing, washing, and the quiet pause before the day begins.', top: '72%', left: '34%' },
  { id: 'chaupal', name: 'Chaupal', label: 'Chaupal', category: 'chaupal', description: 'The open pavilion where news, disputes, and songs are exchanged.', top: '58%', left: '44%' },
  { id: 'shop', name: 'Grocery Shop', label: 'Shop', category: 'shop', description: 'A small wooden store stacked with grain, salt, and lamp oil.', top: '36%', left: '64%' },
  { id: 'potter', name: 'Potter’s Workshop', label: 'Potter', category: 'potter', description: 'A wheel, kiln, and drying line turning clay into everyday vessels.', top: '70%', left: '64%' },
  { id: 'forge', name: 'Blacksmith’s Forge', label: 'Forge', category: 'forge', description: 'The ring of hammer and bellows that keeps tools and hinges alive.', top: '54%', left: '78%' },
  { id: 'cattle', name: 'Cattle Shed', label: 'Cattle', category: 'cattle', description: 'A thatched shelter where oxen, goats, and cows rest between work.', top: '80%', left: '48%' },
  { id: 'grain', name: 'Grain Storage Hut', label: 'Granary', category: 'grain', description: 'Raised storage keeps winter grain and seeds dry above the damp earth.', top: '76%', left: '74%' },
  { id: 'fields', name: 'Crop Fields', label: 'Fields', category: 'fields', description: 'Patchwork millet, wheat, and rice ready for sowing or harvest.', top: '86%', left: '24%' },
  { id: 'garden', name: 'Kitchen Gardens', label: 'Garden', category: 'garden', description: 'Small plots of greens, herbs, and peppers near the family hearth.', top: '86%', left: '14%' },
  { id: 'trees', name: 'Large Shade Trees', label: 'Trees', category: 'tree', description: 'Neem, mango, and peepal provide relief from the heat and shelter for birds.', top: '24%', left: '78%' },
  { id: 'paths', name: 'Footpaths and Lanes', label: 'Paths', category: 'paths', description: 'Narrow trails connect homes, shrines, and the wider village edges.', top: '36%', left: '34%' },
  { id: 'river', name: 'River or Stream', label: 'River', category: 'river', description: 'A slow watercourse at the village edge where buffalo wallow and reeds sway.', top: '12%', left: '84%' },
  { id: 'bridge', name: 'Wooden Bridge', label: 'Bridge', category: 'bridge', description: 'A simple crossing of planks and timber over the stream.', top: '24%', left: '90%' },
  { id: 'grazing', name: 'Open Grazing Ground', label: 'Pasture', category: 'grazing', description: 'Animals roam beyond the homes, their bells faint in the afternoon light.', top: '88%', left: '70%' },
  { id: 'cart', name: 'Bullock Cart Parking', label: 'Cart', category: 'cart', description: 'A resting place for carts that bring grain, timber, and news.', top: '18%', left: '32%' },
  { id: 'school', name: 'School Hut', label: 'School', category: 'school', description: 'A thatched learning space where children practice letters on slate.', top: '66%', left: '12%' },
  { id: 'wash', name: 'Washing Area', label: 'Wash', category: 'wash', description: 'Women gather by the water to wash cloth and hang it to dry.', top: '82%', left: '38%' },
  { id: 'fire', name: 'Community Fireplace', label: 'Fire', category: 'fire', description: 'A shared hearth around which stories, meals, and evening warmth gather.', top: '74%', left: '18%' },
  { id: 'orchard', name: 'Small Orchard', label: 'Orchard', category: 'orchard', description: 'Fruit trees in orderly rows, planted for shade and seasons of sweetness.', top: '90%', left: '56%' },
  { id: 'watch', name: 'Watch Tower', label: 'Watch', category: 'watch', description: 'A raised platform offering a view over the fence and the outer lanes.', top: '10%', left: '68%' },
  { id: 'fence', name: 'Village Boundary Fence', label: 'Fence', category: 'fence', description: 'A thorny hedge and wooden posts mark the village edge from the wild.', top: '6%', left: '48%' },
  { id: 'otla', name: 'Resting Platform', label: 'Otla', category: 'otla', description: 'A stone platform beneath a tree for travelers to pause and rest.', top: '70%', left: '86%' },
  { id: 'trough', name: 'Animal Watering Trough', label: 'Trough', category: 'trough', description: 'A stone trough kept full so livestock can drink without leaving the lane.', top: '64%', left: '92%' },
  { id: 'festival', name: 'Festival Ground', label: 'Festival', category: 'festival', description: 'An open clearing transformed for fairs, songs, and ritual celebration.', top: '92%', left: '82%' },
]

const ancientAdditions = [
  { id: 'stepwell', name: 'Stepwell', label: 'Baoli', category: 'stepwell', description: 'A deep stone well with carved steps and cool shade.', top: '50%', left: '70%' },
  { id: 'ghani', name: 'Oil Press', label: 'Ghani', category: 'ghani', description: 'A bullock-driven press that gives the village its daily cooking oil.', top: '78%', left: '88%' },
  { id: 'chakki', name: 'Flour Mill', label: 'Chakki', category: 'chakki', description: 'A hand or bullock-powered grinder turning grain to flour at dawn.', top: '44%', left: '86%' },
  { id: 'weaver', name: 'Weaver’s Hut', label: 'Weaver', category: 'weaver', description: 'A handloom nest of dyed thread and patient rhythms.', top: '32%', left: '88%' },
  { id: 'carpenter', name: 'Carpenter’s Workshop', label: 'Carpenter', category: 'carpenter', description: 'Wood shavings and half-finished carts gather around the bench.', top: '88%', left: '92%' },
  { id: 'stable', name: 'Stable for Working Animals', label: 'Stable', category: 'stable', description: 'A separate shelter for bullocks and horses beyond the cattle shed.', top: '20%', left: '72%' },
  { id: 'barn', name: 'Storage Barn', label: 'Barn', category: 'barn', description: 'A broad communal barn with surplus grain and timber stacked high.', top: '36%', left: '92%' },
  { id: 'haveli', name: 'Village Chief’s House', label: 'Haveli', category: 'haveli', description: 'The largest home, carved in wood and set apart by its courtyards.', top: '16%', left: '50%' },
]

const craftCards = [
  { name: 'Potter', title: 'Clay and fire', description: 'The potter shapes vessels by hand that will carry water, grain, and memory.', accent: 'from-[#B5651D] to-[#8B5E3C]' },
  { name: 'Blacksmith', title: 'Iron and rhythm', description: 'The forge answers the day with iron rings, ploughs, and tools that outlast a season.', accent: 'from-[#3B6E71] to-[#4C6B3B]' },
  { name: 'Weaver', title: 'Thread and patience', description: 'The weaver turns cotton and dye into cloth that marks births, weddings, and festivals.', accent: 'from-[#D2A857] to-[#B5651D]' },
  { name: 'Carpenter', title: 'Wood and intent', description: 'A carpenter builds carts, doors, and shelves from the village’s own timber.', accent: 'from-[#4C6B3B] to-[#3B6E71]' },
]

const galleryItems = [
  { title: 'Morning at the well', caption: 'A line of pitchers waits beside the rope and pulley.', mood: 'well' },
  { title: 'The banyan council', caption: 'Elders and children gather in the shade of the banyan.', mood: 'banyan' },
  { title: 'Fields before harvest', caption: 'The patchwork fields glow amber as the season turns.', mood: 'fields' },
  { title: 'Temple bells at dusk', caption: 'The shrine lights flare soft against the evening sky.', mood: 'temple' },
  { title: 'Water and wash', caption: 'Cloths dry while buffaloes drink near the pond.', mood: 'water' },
  { title: 'Festival lanterns', caption: 'The festival ground blooms with light and color.', mood: 'festival' },
  { title: 'Cart road at dawn', caption: 'Bullock carts pause under the gate before the road opens.', mood: 'road' },
  { title: 'The forge at work', caption: 'A smith shapes iron while sparks rise in the air.', mood: 'forge' },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [showAncient, setShowAncient] = useState(false)
  const [activeLandmark, setActiveLandmark] = useState(baseLandmarks[0])
  const [selectedLandmark, setSelectedLandmark] = useState(null)
  const [craftIndex, setCraftIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const landmarks = useMemo(() => (showAncient ? [...baseLandmarks, ...ancientAdditions] : baseLandmarks), [showAncient])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-nav-group]')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    const nodes = document.querySelectorAll('.reveal')
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionIds = navSections.map((section) => section.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: 0.2 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const currentCraft = craftCards[craftIndex]
  const currentGallery = galleryItems[galleryIndex]

  const handleNavClick = (href, event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setOpenDropdown(null)
    setIsMenuOpen(false)

    const targetId = href.replace(/^#/, '')
    const target = document.getElementById(targetId) || document.querySelector(href)

    if (target) {
      const offset = 96
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      requestAnimationFrame(() => {
        window.scrollTo({ top, behavior: 'smooth' })
      })
      window.history.replaceState(null, '', href)
    }
  }

  const prevCraft = () => setCraftIndex((index) => (index + craftCards.length - 1) % craftCards.length)
  const nextCraft = () => setCraftIndex((index) => (index + 1) % craftCards.length)
  const prevGallery = () => setGalleryIndex((index) => (index + galleryItems.length - 1) % galleryItems.length)
  const nextGallery = () => setGalleryIndex((index) => (index + 1) % galleryItems.length)

  return (
    <div className="min-h-screen bg-[#f3e9d8] text-[#2b2117]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#2b2117]/95 text-[#f3e9d8] shadow-lg shadow-[#2b2117]/20' : 'bg-transparent text-[#f3e9d8]'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:px-16 lg:px-24">
          <a href="#hero" className="flex items-center gap-3">
            <svg viewBox="0 0 64 64" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
              <rect x="10" y="18" width="20" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2.3" />
              <path d="M18 36v10h12V36" fill="none" stroke="currentColor" strokeWidth="2.3" />
              <path d="M30 20c0-8 10-10 12-4 2 7-4 12-6 14" fill="none" stroke="currentColor" strokeWidth="2.3" />
              <path d="M42 25c3 0 8 4 8 10" fill="none" stroke="currentColor" strokeWidth="2.3" />
            </svg>
            <span className="font-[Rustica] text-lg font-semibold tracking-tight sm:text-xl">Gaonvasa</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {navGroups.map((item) => (
              <div
                key={item.label}
                className="relative"
                data-nav-group
                onMouseEnter={() => setOpenDropdown(item.label)}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full px-3 py-2 transition hover:bg-white/10"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onFocus={() => setOpenDropdown(item.label)}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {openDropdown === item.label && (
                  <div className="animate-dropdown absolute left-0 top-10 min-w-[180px] rounded-2xl border border-white/20 bg-[#2b2117]/90 p-2 shadow-xl">
                    {item.links.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        onClick={(event) => handleNavClick(sub.href, event)}
                        className="relative z-10 block rounded-xl px-3 py-2 text-sm text-[#f3e9d8] transition hover:bg-[#f3e9d8]/10"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#visit"
              onClick={(event) => handleNavClick('#visit', event)}
              className="rounded-full border border-[#f3e9d8]/10 px-4 py-2 text-sm transition hover:bg-[#f3e9d8]/10"
            >
              Visit
            </a>
          </nav>

          <button
            type="button"
            className="liquid-clay rounded-full px-4 py-2 text-sm font-medium text-[#f3e9d8] lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-[#f3e9d8]/10 bg-[#2b2117]/95 px-5 py-4 text-[#f3e9d8] backdrop-blur lg:hidden">
            <div className="space-y-3">
              {navGroups.map((group) => (
                <div key={group.label} className="rounded-2xl border border-[#f3e9d8]/10 bg-[#f3e9d8]/10 p-3">
                  <div className="font-medium">{group.label}</div>
                  <div className="mt-2 space-y-1 text-sm text-[#f3e9d8]/80">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(event) => handleNavClick(link.href, event)}
                        className="relative z-10 block rounded-xl px-2 py-1 transition hover:bg-[#f3e9d8]/10"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <a
                href="#visit"
                onClick={(event) => handleNavClick('#visit', event)}
                className="block rounded-2xl border border-[#f3e9d8]/10 bg-[#f3e9d8]/10 p-3 font-medium"
              >
                Visit
              </a>
            </div>
          </div>
        )}
      </header>

      <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-3 rounded-full border border-[#2b2117]/10 bg-[#f3e9d8]/80 p-2 shadow-lg shadow-[#2b2117]/10 backdrop-blur">
          {navSections.map((section) => (
            <button
              key={section.id}
              type="button"
              aria-label={section.title}
              onClick={(event) => handleNavClick(`#${section.id}`, event)}
              className={`group relative h-3 w-3 rounded-full transition ${activeSection === section.id ? 'bg-[#B5651D] scale-125' : 'bg-[#2b2117]/40 hover:bg-[#3B6E71]'}`}
            >
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-[#2b2117] px-2 py-1 text-[10px] font-medium text-[#f3e9d8] opacity-0 transition group-hover:opacity-100">
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <main>
        <section id="hero" className="relative h-screen overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/background.mp4"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#2b2117]/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,235,200,0.25),_transparent_60%)]" />
          <div className="relative z-10 flex h-full items-center px-5 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-[#2b2117]/40 p-8 text-[#f3e9d8] shadow-2xl shadow-[#2b2117]/30 backdrop-blur-sm sm:p-10 md:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#D2A857]">An immersive walk through old India</p>
              <h1 className="font-[Rustica] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                A village frozen in time.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[#f3e9d8]/90 sm:text-xl">
                Step into the rhythm of a living rural settlement where water, stories, and work are still shared in the open air.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#village" onClick={(event) => handleNavClick('#village', event)} className="liquid-clay rounded-full px-5 py-3 font-medium text-[#f3e9d8] shadow-lg shadow-[#2b2117]/20">
                  Begin the Walk
                </a>
                <a href="#festival" onClick={(event) => handleNavClick('#festival', event)} className="flex items-center gap-2 rounded-full border border-[#f3e9d8]/40 bg-white/10 px-5 py-3 font-medium text-[#f3e9d8] backdrop-blur">
                  <Play size={16} /> Watch the Village Wake Up
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-[#f3e9d8]">
            <ChevronDown size={24} />
          </div>
        </section>

        <section id="village" className="relative min-h-[90vh] px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <div className="reveal max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B5651D]">The village map</p>
              <h2 className="font-[Rustica] text-3xl text-[#2b2117] sm:text-4xl">
                Follow the lanes that hold the village together.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#2b2117]/80">
                Every courtyard, shrine, and road is shaped by shared labor. Tap or hover a place to reveal its story as if the village itself were speaking back.
              </p>
            </div>

            <div className="reveal grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#8B5E3C]/20 bg-[#f9f0e4] p-4 shadow-[0_20px_45px_rgba(43,33,23,0.12)] sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(210,168,87,0.35),_transparent_35%)]" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-[#8B5E3C]/20 bg-[#fffaf1] p-3">
                  <svg viewBox="0 0 640 480" className="w-full" role="img" aria-label="Illustrated village map with landmarks">
                    <rect x="18" y="14" width="604" height="452" rx="24" fill="#f9f0e2" />
                    <path d="M90 110 C175 80, 250 84, 320 110 C390 136, 512 128, 560 160" stroke="#8B5E3C" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M120 160 C190 188, 248 216, 314 208 C410 198, 470 228, 548 252" stroke="#8B5E3C" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M148 296 C218 272, 274 286, 330 312 C402 344, 446 350, 518 318" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M130 215 C180 252, 198 262, 250 288" stroke="#4C6B3B" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <rect x="100" y="94" width="136" height="76" rx="16" fill="#D2A857" fillOpacity="0.18" />
                    <rect x="250" y="228" width="130" height="96" rx="18" fill="#B5651D" fillOpacity="0.1" />
                    <rect x="388" y="284" width="122" height="92" rx="16" fill="#3B6E71" fillOpacity="0.12" />
                    <circle cx="180" cy="140" r="38" fill="#3B6E71" fillOpacity="0.16" />
                    <circle cx="470" cy="322" r="42" fill="#4C6B3B" fillOpacity="0.16" />
                    <path d="M212 142c-6 14-8 30-2 46" stroke="#8B5E3C" strokeWidth="3" />
                    <path d="M232 170c16 0 31 15 26 36" stroke="#4C6B3B" strokeWidth="3" />
                  </svg>

                  <div className="absolute inset-0">
                    {landmarks.map((landmark) => (
                      <button
                        key={landmark.id}
                        type="button"
                        className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[10px] font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#D2A857] ${activeLandmark?.id === landmark.id ? 'border-[#B5651D] bg-[#B5651D] text-[#fffaf1] shadow-[0_0_0_6px_rgba(181,101,29,0.18)]' : 'border-[#2b2117]/10 bg-[#fffaf1] text-[#2b2117] hover:border-[#B5651D]'}`}
                        style={{ left: landmark.left, top: landmark.top }}
                        onMouseEnter={() => setActiveLandmark(landmark)}
                        onFocus={() => setActiveLandmark(landmark)}
                        onClick={() => {
                          setActiveLandmark(landmark)
                          setSelectedLandmark(landmark)
                        }}
                        aria-label={`Open ${landmark.name}`}
                      >
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {landmark.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[2rem] border border-[#8B5E3C]/20 bg-[#2b2117] p-5 text-[#f3e9d8] shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#D2A857]">Live focus</p>
                      <h3 className="mt-2 font-[Rustica] text-2xl">{activeLandmark?.name}</h3>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-[#f3e9d8]/15 bg-[#f3e9d8]/10 px-3 py-2 text-sm"
                      onClick={() => setSelectedLandmark(activeLandmark)}
                    >
                      View
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#f3e9d8]/80">{activeLandmark?.description}</p>
                </div>

                <div className="rounded-[2rem] border border-[#8B5E3C]/20 bg-[#f9f0e4] p-5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#3B6E71]">Ancient mode</p>
                      <h3 className="mt-2 font-[Rustica] text-2xl">Older layers of memory</h3>
                    </div>
                    <label className="flex items-center gap-2 rounded-full bg-[#2b2117] px-3 py-2 text-sm text-[#f3e9d8]">
                      <input type="checkbox" checked={showAncient} onChange={() => setShowAncient((prev) => !prev)} className="h-4 w-4 rounded border-none accent-[#D2A857]" />
                      Ancient
                    </label>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#2b2117]/80">
                    Toggle Ancient Mode to see how the same village might have looked several centuries earlier, with stepwells, oil presses, and other pre-modern structures layered into the same landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {selectedLandmark && (
            <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#2b2117]/60 p-4 sm:items-center">
              <div className="w-full max-w-xl rounded-[2rem] border border-[#f3e9d8]/10 bg-[#fffaf1] p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#B5651D]">Detail view</p>
                    <h3 className="mt-2 font-[Rustica] text-2xl text-[#2b2117]">{selectedLandmark.name}</h3>
                  </div>
                  <button type="button" onClick={() => setSelectedLandmark(null)} className="rounded-full border border-[#2b2117]/10 p-2 text-[#2b2117]">
                    <X size={18} />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#2b2117]/80">{selectedLandmark.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm text-[#3B6E71]">
                  <Compass size={15} />
                  A place remembered by the people who keep it alive.
                </div>
              </div>
            </div>
          )}
        </section>

        <SectionCard
          id="well"
          eyebrow="A day at the well"
          title="Morning routines, water, gossip, and news."
          copy="Before the sun reaches its brightest, women and children gather at the well with pitchers, ropes, and stories. The exchange of water is also the exchange of yesterday’s news."
          align="right"
          illustration={<WellIllustration />}
        />

        <SectionCard
          id="banyan"
          eyebrow="Under the banyan"
          title="The village council grows in the shade."
          copy="Beneath the banyan, decisions are softened by laughter, children learn by watching, and elders pass down tales that are older than the walls around them."
          align="left"
          illustration={<BanyanIllustration />}
        />

        <section id="crafts" className="relative min-h-[80vh] px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2.5rem] border border-[#8B5E3C]/20 bg-[#fffaf1] p-6 shadow-[0_20px_45px_rgba(43,33,23,0.12)] sm:p-8 lg:p-10">
            <div className="reveal max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B5651D]">Hands that build</p>
              <h2 className="font-[Rustica] text-3xl text-[#2b2117] sm:text-4xl">The village is fashioned by patient hands.</h2>
              <p className="mt-4 text-lg leading-8 text-[#2b2117]/80">
                From clay pots to iron tools and woven cloth, each craft is a thread in the village’s daily life.
              </p>
            </div>
            <div className="reveal grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`rounded-[2rem] bg-gradient-to-br ${currentCraft.accent} p-8 text-[#fffaf1]`}>
                <p className="text-sm uppercase tracking-[0.3em] text-[#f3e9d8]/80">Craft of the day</p>
                <h3 className="mt-4 font-[Rustica] text-3xl">{currentCraft.name}</h3>
                <p className="mt-3 text-lg leading-8 text-[#f3e9d8]/90">{currentCraft.description}</p>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={prevCraft} className="rounded-full border border-[#f3e9d8]/40 p-2" aria-label="Previous craft">
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" onClick={nextCraft} className="rounded-full border border-[#f3e9d8]/40 p-2" aria-label="Next craft">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="rounded-[2rem] border border-[#8B5E3C]/20 bg-[#f9f0e4] p-5">
                <CraftIllustration type={currentCraft.name} />
              </div>
            </div>
          </div>
        </section>

        <SectionCard
          id="fields"
          eyebrow="Fields and seasons"
          title="The land speaks through sowing and harvest."
          copy="The village lives by the measure of monsoon and moonlight. Seeds are sown with prayer, and harvest festivals are held when the fields answer back."
          align="left"
          illustration={<FieldIllustration />}
        />

        <SectionCard
          id="water"
          eyebrow="Water and rest"
          title="Pond, stream, bridge, and the pause between chores."
          copy="Water carries work but also rest. A bridge over the stream and a shaded platform by the pond become places where the day slows down."
          align="right"
          illustration={<WaterIllustration />}
        />

        <SectionCard
          id="guard"
          eyebrow="Guarding the village"
          title="The fence, gate, and watchtower protect more than walls."
          copy="The edge of the village is watched not only for danger but for memory—a line of belonging that keeps the settlement intimate and whole."
          align="left"
          illustration={<GuardIllustration />}
        />

        <section id="festival" className="relative min-h-[80vh] px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="reveal max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B5651D]">When the village celebrates</p>
              <h2 className="font-[Rustica] text-3xl text-[#2b2117] sm:text-4xl">Lanterns, drums, and the whole clearing lit up.</h2>
              <p className="mt-4 text-lg leading-8 text-[#2b2117]/80">Festivals turn the ordinary lanes into a shared stage, with songs, lights, and meals that carry everyone into one collective breath.</p>
            </div>
            <div className="reveal mt-8 columns-2 gap-4 sm:columns-3 md:columns-4">
              {galleryItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setGalleryIndex(index)
                    setGalleryOpen(true)
                  }}
                  className="mb-4 block w-full overflow-hidden rounded-[1.3rem] border border-[#8B5E3C]/20 bg-[#fffaf1] text-left shadow-lg shadow-[#2b2117]/10 transition hover:-translate-y-1"
                  aria-label={`Open ${item.title}`}
                >
                  <div className="h-40 w-full bg-[#f3e9d8] p-3">
                    <GalleryScene mood={item.mood} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[Rustica] text-lg text-[#2b2117]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#2b2117]/70">{item.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {galleryOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2b2117]/70 p-4">
              <div className="w-full max-w-3xl rounded-[2rem] border border-[#f3e9d8]/10 bg-[#fffaf1] p-5 shadow-2xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#B5651D]">Lightbox</p>
                    <h3 className="mt-2 font-[Rustica] text-2xl text-[#2b2117]">{currentGallery.title}</h3>
                  </div>
                  <button type="button" onClick={() => setGalleryOpen(false)} className="rounded-full border border-[#2b2117]/10 p-2 text-[#2b2117]">
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 rounded-[1.5rem] border border-[#8B5E3C]/20 bg-[#f3e9d8] p-3">
                  <GalleryScene mood={currentGallery.mood} />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#2b2117]/80">{currentGallery.caption}</p>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={prevGallery} className="flex items-center gap-2 rounded-full border border-[#2b2117]/10 px-4 py-2 text-sm text-[#2b2117]">
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button type="button" onClick={nextGallery} className="flex items-center gap-2 rounded-full border border-[#2b2117]/10 px-4 py-2 text-sm text-[#2b2117]">
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer id="visit" className="border-t border-[#8B5E3C]/20 bg-[#2b2117] px-5 py-16 text-[#f3e9d8] sm:px-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
                <path d="M18 22h10c8 0 16 6 16 15v6H24v-6c0-5 3-8 8-8h4" fill="none" stroke="#D2A857" strokeWidth="2.4" />
                <path d="M16 54c7-8 14-12 24-12 8 0 15 3 24 10" fill="none" stroke="#4C6B3B" strokeWidth="2.4" />
                <circle cx="24" cy="12" r="5" fill="#B5651D" />
              </svg>
              <span className="font-[Rustica] text-xl">Gaonvasa</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#f3e9d8]/80">
              A tribute to rural India’s timeless way of life, where the village is still remembered by its rhythms, rituals, and landmarks.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-[Rustica] text-lg">The Village</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#f3e9d8]/70">
                <li><a href="#village">Map</a></li>
                <li><a href="#well">History</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-[Rustica] text-lg">Life Here</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#f3e9d8]/70">
                <li><a href="#crafts">Trades</a></li>
                <li><a href="#festival">Festivals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-[Rustica] text-lg">Visit</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#f3e9d8]/70">
                <li className="flex items-center gap-2"><Mail size={14} /> hello@gaonvasa.com</li>
                <li className="flex items-center gap-2"><MapPin size={14} /> Raghogarh, Rajasthan</li>
                <li className="flex items-center gap-2"><Camera size={14} /> @gaonvasa</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionCard({ id, eyebrow, title, copy, align, illustration }) {
  const isLeft = align === 'left'
  return (
    <section id={id} className="relative min-h-[80vh] px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-28 lg:px-24">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#8B5E3C]/20 bg-[#fffaf1] p-6 shadow-[0_20px_45px_rgba(43,33,23,0.12)] sm:p-8 lg:p-10">
        <div className={`reveal grid gap-8 items-center lg:grid-cols-2 ${isLeft ? '' : 'lg:[&>*:first-child]:order-2'}`}>
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B5651D]">{eyebrow}</p>
            <h2 className="font-[Rustica] text-3xl text-[#2b2117] sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-[#2b2117]/80">{copy}</p>
            <a href="#festival" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B5651D] px-4 py-2 text-sm font-medium text-[#fffaf1]">
              Continue the walk <ArrowRight size={16} />
            </a>
          </div>
          <div className="rounded-[2rem] border border-[#8B5E3C]/20 bg-[#f3e9d8] p-5">
            {illustration}
          </div>
        </div>
      </div>
    </section>
  )
}

function WellIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A village well with a rope and a few people carrying buckets">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <circle cx="164" cy="120" r="54" fill="#3B6E71" fillOpacity="0.18" />
      <circle cx="164" cy="120" r="36" fill="#fffaf1" stroke="#8B5E3C" strokeWidth="4" />
      <path d="M132 128c12-16 30-24 50-24 19 0 34 8 44 25" stroke="#8B5E3C" strokeWidth="4" fill="none" />
      <path d="M102 74c18-20 34-29 51-27" stroke="#B5651D" strokeWidth="3" fill="none" />
      <path d="M112 106c0 26 18 40 34 40" stroke="#4C6B3B" strokeWidth="3" fill="none" />
      <path d="M236 90c0 16 12 28 28 28" stroke="#3B6E71" strokeWidth="3" fill="none" />
      <path d="M120 74l-16 18" stroke="#2b2117" strokeWidth="3" />
      <path d="M210 84l18 18" stroke="#2b2117" strokeWidth="3" />
    </svg>
  )
}

function BanyanIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A banyan tree with people sitting beneath it">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <path d="M138 176c0-42 17-72 48-93 35 20 41 55 36 87" fill="#4C6B3B" fillOpacity="0.26" />
      <path d="M130 174c10-54 48-86 78-100" stroke="#4C6B3B" strokeWidth="5" fill="none" />
      <path d="M144 176c-6-38 10-62 30-82" stroke="#4C6B3B" strokeWidth="4" fill="none" />
      <path d="M168 174c0-29 12-48 32-63" stroke="#4C6B3B" strokeWidth="4" fill="none" />
      <circle cx="150" cy="98" r="14" fill="#B5651D" />
      <circle cx="184" cy="74" r="12" fill="#B5651D" />
      <rect x="96" y="174" width="122" height="22" rx="10" fill="#D2A857" fillOpacity="0.45" />
      <circle cx="120" cy="162" r="8" fill="#2b2117" />
      <circle cx="156" cy="162" r="8" fill="#2b2117" />
      <circle cx="190" cy="162" r="8" fill="#2b2117" />
    </svg>
  )
}

function CraftIllustration({ type }) {
  if (type === 'Blacksmith') {
    return (
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A blacksmith at work with an anvil and furnace">
        <rect width="320" height="220" rx="22" fill="#f9f0e2" />
        <rect x="96" y="132" width="92" height="40" rx="10" fill="#8B5E3C" />
        <rect x="98" y="116" width="72" height="20" rx="8" fill="#2b2117" />
        <rect x="120" y="84" width="20" height="34" fill="#2b2117" />
        <path d="M120 78c10-16 22-24 38-24" stroke="#B5651D" strokeWidth="4" fill="none" />
        <circle cx="214" cy="92" r="28" fill="#D2A857" />
        <path d="M210 64c10 8 16 18 16 28" stroke="#2b2117" strokeWidth="3" fill="none" />
      </svg>
    )
  }

  if (type === 'Weaver') {
    return (
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A weaver working at a loom">
        <rect width="320" height="220" rx="22" fill="#f9f0e2" />
        <rect x="84" y="70" width="146" height="96" rx="14" fill="#fffaf1" stroke="#8B5E3C" strokeWidth="3" />
        <path d="M112 76v80" stroke="#3B6E71" strokeWidth="4" />
        <path d="M144 76v80" stroke="#B5651D" strokeWidth="4" />
        <path d="M176 76v80" stroke="#4C6B3B" strokeWidth="4" />
        <path d="M208 76v80" stroke="#D2A857" strokeWidth="4" />
        <path d="M92 92h154" stroke="#2b2117" strokeWidth="2" />
      </svg>
    )
  }

  if (type === 'Carpenter') {
    return (
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A carpenter's bench with wood shavings">
        <rect width="320" height="220" rx="22" fill="#f9f0e2" />
        <rect x="84" y="122" width="136" height="26" rx="10" fill="#8B5E3C" />
        <rect x="102" y="84" width="24" height="46" rx="8" fill="#2b2117" />
        <path d="M132 92h58" stroke="#2b2117" strokeWidth="4" />
        <path d="M154 82l32 20" stroke="#B5651D" strokeWidth="3" />
        <path d="M118 152c16 10 44 18 72 12" stroke="#4C6B3B" strokeWidth="3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A potter shaping clay on a wheel">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <circle cx="156" cy="118" r="44" fill="#fffaf1" stroke="#8B5E3C" strokeWidth="4" />
      <path d="M120 118h70" stroke="#2b2117" strokeWidth="3" />
      <path d="M152 72h10" stroke="#B5651D" strokeWidth="4" />
      <path d="M110 146c24-18 52-20 88-8" stroke="#4C6B3B" strokeWidth="3" />
      <path d="M214 96c20 8 24 28 20 36" stroke="#3B6E71" strokeWidth="3" />
    </svg>
  )
}

function FieldIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A patchwork of fields with a scarecrow and crops">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <path d="M76 150h176" stroke="#4C6B3B" strokeWidth="8" />
      <path d="M86 124h70" stroke="#D2A857" strokeWidth="6" />
      <path d="M190 124h44" stroke="#D2A857" strokeWidth="6" />
      <path d="M98 148v24" stroke="#8B5E3C" strokeWidth="3" />
      <path d="M170 148v24" stroke="#8B5E3C" strokeWidth="3" />
      <path d="M214 148v24" stroke="#8B5E3C" strokeWidth="3" />
      <circle cx="152" cy="92" r="14" fill="#2b2117" />
      <rect x="144" y="102" width="18" height="30" fill="#B5651D" />
      <path d="M146 74c8-16 18-24 32-28" stroke="#8B5E3C" strokeWidth="3" />
    </svg>
  )
}

function WaterIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A pond, bridge, and a resting platform by the water">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <path d="M84 126c34-34 80-40 132-20" stroke="#3B6E71" strokeWidth="6" fill="none" />
      <path d="M84 142c34 18 92 22 144 8" stroke="#4C6B3B" strokeWidth="5" fill="none" />
      <rect x="106" y="118" width="70" height="18" rx="6" fill="#8B5E3C" />
      <path d="M116 136l-20 22" stroke="#2b2117" strokeWidth="3" />
      <path d="M178 136l24 22" stroke="#2b2117" strokeWidth="3" />
      <path d="M214 100c22 0 28 18 28 32" stroke="#B5651D" strokeWidth="3" fill="none" />
    </svg>
  )
}

function GuardIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label="A village gate and watchtower at the outskirts">
      <rect width="320" height="220" rx="22" fill="#f9f0e2" />
      <path d="M90 168h144" stroke="#4C6B3B" strokeWidth="6" />
      <path d="M118 168V92h44v76" fill="#8B5E3C" />
      <path d="M164 168V92h44v76" fill="#8B5E3C" />
      <path d="M132 92l-8-18" stroke="#2b2117" strokeWidth="3" />
      <path d="M188 92l8-18" stroke="#2b2117" strokeWidth="3" />
      <rect x="164" y="74" width="30" height="34" rx="6" fill="#D2A857" />
      <path d="M90 74h20" stroke="#2b2117" strokeWidth="3" />
      <path d="M210 74h20" stroke="#2b2117" strokeWidth="3" />
    </svg>
  )
}

function GalleryScene({ mood }) {
  if (mood === 'banyan') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Banyan tree scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <path d="M90 160c0-38 14-62 38-80 26 18 34 45 26 80" fill="#4C6B3B" fillOpacity="0.26" />
        <circle cx="122" cy="86" r="12" fill="#B5651D" />
      </svg>
    )
  }
  if (mood === 'fields') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Field scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <path d="M58 150h104" stroke="#4C6B3B" strokeWidth="6" />
        <path d="M72 122h42" stroke="#D2A857" strokeWidth="4" />
        <path d="M132 122h28" stroke="#D2A857" strokeWidth="4" />
      </svg>
    )
  }
  if (mood === 'temple') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Temple scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <path d="M92 156v-42h36v42" fill="#8B5E3C" />
        <path d="M98 114h24" stroke="#2b2117" strokeWidth="3" />
        <path d="M104 86c10-20 20-34 28-34" stroke="#B5651D" strokeWidth="3" />
      </svg>
    )
  }
  if (mood === 'water') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Water scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <path d="M64 128c20-22 44-28 82-18" stroke="#3B6E71" strokeWidth="4" fill="none" />
        <path d="M72 146c24 10 54 12 80 4" stroke="#4C6B3B" strokeWidth="4" fill="none" />
      </svg>
    )
  }
  if (mood === 'festival') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Festival scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <circle cx="110" cy="106" r="28" fill="#D2A857" />
        <circle cx="86" cy="78" r="10" fill="#B5651D" />
        <circle cx="136" cy="78" r="10" fill="#4C6B3B" />
      </svg>
    )
  }
  if (mood === 'forge') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Forge scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <rect x="78" y="122" width="64" height="30" rx="8" fill="#8B5E3C" />
        <circle cx="154" cy="94" r="22" fill="#D2A857" />
      </svg>
    )
  }
  if (mood === 'road') {
    return (
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Road scene">
        <rect width="220" height="220" rx="22" fill="#f9f0e2" />
        <path d="M66 144c18-22 52-42 88-36" stroke="#8B5E3C" strokeWidth="4" fill="none" />
        <path d="M66 154c22 10 54 12 84 4" stroke="#4C6B3B" strokeWidth="4" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Well scene">
      <rect width="220" height="220" rx="22" fill="#f9f0e2" />
      <circle cx="112" cy="112" r="34" fill="#fffaf1" stroke="#8B5E3C" strokeWidth="3" />
      <path d="M92 116c10-12 24-18 42-16" stroke="#3B6E71" strokeWidth="3" fill="none" />
    </svg>
  )
}

export default App
