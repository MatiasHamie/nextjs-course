interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: loremipsum",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "In progress: loremipsum2",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Terminadas: loremipsum3",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
