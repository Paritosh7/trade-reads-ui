const users = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Maria Com Com",
    email: "mcomcom@hitmail.com",
    image_url: "/users/maria-com-com.jpg",
  },
  {
    id: "d0cdfaa6-beee-4dd9-bfe6-cbcfeceffa8a",
    name: "José da Silva",
    email: "josedasilva@gmail.com",
    image_url: "/users/joao-da-silva.jpg",
  },
];

const books = [
  {
    id: "e0cdfaa6-ceee-4dd9-bfe6-cbcfeceffa8a",
    title: "The Hunger Games",
    description:
      "WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead beforeâ€”and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
    author: "Suzanne Collins",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528481068l/40495148._SY475_.jpg",
    genre: "Novel",
    pages: 256,
    isRented: false,
    stock: 34,
    rentPrice: 24,
    sellPrice: 230,
    sold: 12,
    ISBN: "1-86092-049-7",
  },
  {
    id: "e0cdfaa6-deee-4dd9-bfe6-cbcfeceffa8a",
    title: "Murder!",
    description:
      "Stories in the Travelman Short Stories series take the reader to places of mystery, fantasy, horror, romance, and corners of the universe yet unexplored.",
    author: "Arnold Bennett",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1567840212l/10572.jpg",
    genre: "Crime",
    pages: 198,
    isRented: true,
    stock: 7,
    rentPrice: 15,
    sellPrice: 120,
    sold: 10,
    ISBN: "1-86092-050-3",
    renterIds: ["d0cdfaa6-beee-4dd9-bfe6-cbcfeceffa"],
  },
  {
    id: "e0cdfaa6-aeee-4dd8-b2e6-cbcfeceffa8a",
    title: "Alice's Adventures in Wonderland",
    description:
      "Alice's Adventures in Wonderland (commonly Alice in Wonderland) is an 1865 English children's novel by Lewis Carroll, a mathematics don at Oxford University. It details the story of a young girl named Alice who falls through a rabbit hole into a fantasy world of anthropomorphic creatures.",
    author: "Lewis Carroll",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg",
    genre: "Children",
    pages: 128,
    isRented: false,
    stock: 12,
    rentPrice: 10,
    sellPrice: 100,
    sold: 15,
    ISBN: "1-86092-051-X",
  },
  {
    id: "e0cdfaa6-aeee-4dd9-bfe6-cbcfeceffa8a",
    title: "Pride and Prejudice",
    description:
      "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
    author: "Jane Austen",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg",
    genre: "Classic",
    pages: 280,
    isRented: false,
    stock: 20,
    rentPrice: 15,
    sellPrice: 120,
    sold: 10,
    ISBN: "1-86092-052-8",
  },
  {
    id: "e0cdfaa6-beee-4dd9-bfe6-cbcfeceffa8a",
    title: "War and Peace",
    description:
      "War and Peace broadly focuses on Napoleon's invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment;",
    author: "Leo Tolstoy",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361039443l/41865.jpg",
    genre: "Historical Fiction",
    pages: 928,
    isRented: false,
    stock: 15,
    rentPrice: 20,
    sellPrice: 250,
    sold: 10,
    ISBN: "1-86092-053-6",
  },
  {
    id: "e0cdfaa6-beee-4dd9-bfe6-cbcfeceffa8b",
    title: "The Man",
    description:
      "The story of a brilliant man whose unflinching dedication to independence of thought and transparency in business sparked an entire industry--and whose personal tribulations humbled and strengthened him. Through it all, Alfred Best remained the eternal optimist.",
    author: "AM Best",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546103428l/5297.jpg",
    genre: "Biography",
    pages: 700,
    isRented: true,
    stock: 10,
    rentPrice: 15,
    sellPrice: 120,
    sold: 10,
    ISBN: "1-86092-054-4",
    renterIds: [
      "d0cdfaa6-beee-4dd9-bfe6-cbcfeceffa",
      "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    ],
  },
  {
    id: "e0cdfaa6-beee-4dd9-bfe6-cbcfeceffa8c",
    title: "The Alchemist",
    description:
      "The Alchemist is a novel by Brazilian 'author' Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
    author: "Paulo Coelho",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327872220l/24213.jpg",
    genre: "Fiction",
    pages: 280,
    isRented: false,
    stock: 0,
    rentPrice: 15,
    sellPrice: 120,
    sold: 1,
    ISBN: "1-86092-055-2",
  },
  {
    id: "e0cdfaa6-beee-4dd9-bfe6-cbcfeceffa8d",
    title: "Moby Dick",
    description:
      "Herman Melville's Moby Dick is the story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew.",
    author: "Herman Melville",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557343311l/10210._SY475_.jpg",
    genre: "Novels",
    pages: 320,
    isRented: false,
    stock: 10,
    rentPrice: 15,
    sellPrice: 120,
    sold: 1,
    ISBN: "1-86092-056-0",
  },
];

const getAllBooks = () => {
  return books;
};

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

module.exports = {
  getAllBooks,
  getBookById,
};
