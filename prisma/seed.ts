import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

// import { PrismaClient } from "../app/generated/prisma/client";

const date = new Date(0);

console.log(date.toISOString()); // "1970-01-01T00:00:00.000Z"

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const tomSaywer = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Tom Saywer",
      author: "Mark Twain",
      pageCount: 250,
      isbn: "1234567890",
      description: "Very good book",
      genre: "Adventures",
      publisher: "Pinguin",
      startedReading: date.toISOString(),
      finishedReading: date.toISOString(),
      publishedAt: date.toISOString(),
      coverImageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT8MsFjNdwLtylUT63trYXtuUlV_6zA5XAeRZm5P6VG6WQVwSnMQ336iMiE0K_UZCeKIR7sh0Al-fTaQ93esClS7Xc_bKbeaQbbsM2S5ns&usqp=CAc",
      language: "English",
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  });

  const theWayOfKings = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "The way of Kings",
      author: "Brandon Sanderson",
      pageCount: 500,
      isbn: "1234567891",
      description: "Very good book",
      genre: "Fantasy",
      publisher: "Pinguin",
      startedReading: date.toISOString(),
      finishedReading: date.toISOString(),
      publishedAt: date.toISOString(),
      coverImageUrl:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcStUJwGxaFXqSk79qezML2ZroCdvMNBlC7isYyKrKOEg1xkFGDgQ0zg56R6qrVEcfqORSWka6II0QECYFqZ29WAIsotg5c35WCQ9sKko-757J1KHOws5G2zZmU7Srn1a2dAy12C9YHmvA&usqp=CAc",
      language: "English",
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  });
  const jordanAvida = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      title: "Micheal Jordan A Vida",
      author: "Roland Lazenby",
      pageCount: 715,
      isbn: "9789895626221",
      description: "Book about the Greatest Sportsman of All Times",
      genre: "Sports",
      publisher: "Pinguin",
      startedReading: date.toISOString(),
      finishedReading: date.toISOString(),
      publishedAt: date.toISOString(),
      coverImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvYPuc6p33hAzZ2H1Rm5xvCjSb9gvmBA5aLmCuRbkfw&s",
      language: "Portuguese",
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  });
  const BatmanTheLOngHalloween = await prisma.book.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      title: "Batman The Long Halloween",
      author: "Jeph Loeb with art by Tim Sale",
      pageCount: 384,
      isbn: "9781401232597",
      description: "Written by JEPH LOEB Art and cover by TIM SALE From the early days of Batman’s crimefighting career, this new edition of the classic mystery involves a killer who strikes only on holidays. Working with Harvey Dent and Lieutenant Gordon, Batman races to discover who Holiday is! Collected from the original 13-issue series",
      genre: "Comics",
      publisher: "DC comics",
      startedReading: date.toISOString(),
      finishedReading: date.toISOString(),
      publishedAt: date.toISOString(),
      coverImageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzaM5jzRQUmvqcejeyiF55hKFRh5Zs4VxLhLAX7qMzXX44x28-4Ef4IPodIqUWxwl6BH4ueg3z4mbGWX_stcH8SaE8cYrdR8CyBsOvJPUfv5eZE4ZqI6Oq&usqp=CAc",
      language: "English",
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  });
  console.log({ tomSaywer, theWayOfKings, jordanAvida, BatmanTheLOngHalloween  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
