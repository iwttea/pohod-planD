export const useTrips = () => {
  const trips = ref([
    {
      id: 1,
      img: 'https://zovgor.com/assets/images/pohody-po-abhazii.jpg',
      title: 'Поход в горы Кавказа',
      description: 'Ежедневный поход по известным курортам. Кавказская зона. Посетите Бахрейн, Литву и другие страны.',
      location: 'Кавказ, Россия',
      start_date: '2026-05-15',
      end_date: '2026-05-18',
      max_participants: 12,
      difficulty: 'medium',
      status: 'planned',
      organizer: { id: 2, fio: 'Александр Иванов' },
      participants: Array(8).fill({})
    },
    {
      id: 2,
      img: 'https://turclub-pik.ru/crop/800/360/uploads/routes/covers/0b04c267698e42bc71efc321bc7deb4b.jpeg.webp',
      title: 'Лесной поход в Карелию',
      description: 'Посещение уникальных лесов и посещение исторических мест и памятников у добра.',
      location: 'Карелия, Россия',
      start_date: '2026-06-10',
      end_date: '2026-06-15',
      max_participants: 15,
      difficulty: 'easy',
      status: 'planned',
      organizer: { id: 3, fio: 'Елена Смирнова' },
      participants: Array(10).fill({})
    },
    {
      id: 3,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8YY__NUBXJUjyhUcVBCMkqpcuBWVYl11_ag&s',
      title: 'Альпийская экспедиция',
      description: 'Современное исследование для активных путешествий. Требуется хорошее физическое подготовка и опыт.',
      location: 'Алтай, Россия',
      start_date: '2026-06-20',
      end_date: '2026-06-27',
      max_participants: 8,
      difficulty: 'hard',
      status: 'planned',
      organizer: { id: 4, fio: 'Игорь Войков' },
      participants: Array(8).fill({})
    },
    {
      id: 4,
      img: 'https://s7.stc.all.kpcdn.net/russia/wp-content/uploads/2021/05/vodop-podmsk-semi-ruch-2048.jpg',
      title: 'Однодневный поход к водопадам',
      description: 'Каждый очередной наездник при нахождении в озере с детьми. Посещение горы, расположенной вокруг озера.',
      location: 'Подмосковье, Россия',
      start_date: '2026-05-05',
      end_date: '2026-05-05',
      max_participants: 12,
      difficulty: 'easy',
      status: 'planned',
      organizer: { id: 5, fio: 'Ольга Николаевна' },
      participants: Array(10).fill({})
    }
  ])
  
  const getTripById = (id) => {
    return trips.value.find(t => t.id === id)
  }
  
  return { trips, getTripById }
}