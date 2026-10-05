export const categories = [
  "All services", "ID & PVC cards", "Trophies & medals", "Stationery items",
  "School bags", "Office items", "Printing services", "Photo services", "T-shirt printing",
];

export const products = [
  { id: "p1", name: "Printed school ID cards", category: "ID & PVC cards", sub: "ID cards", icon: "id", color: "blue", custom: true, desc: "Custom printed student ID cards for schools and institutes. Share the photograph, details and preferred design on WhatsApp." },
  { id: "p2", name: "Staff ID card with lanyard", category: "ID & PVC cards", sub: "ID cards", icon: "id", color: "blue", custom: true, desc: "Professional staff identification cards with lanyard options for schools, offices and organisations." },
  { id: "p3", name: "Custom PVC card", category: "ID & PVC cards", sub: "PVC cards", icon: "id", color: "orange", custom: true, desc: "Durable full-colour PVC cards personalised with your required artwork, photograph and details." },
  { id: "p4", name: "Achievement trophies", category: "Trophies & medals", sub: "Trophies", icon: "trophy", color: "gold", custom: true, desc: "Trophies for school events, competitions, sports and special achievements, with custom name details." },
  { id: "p5", name: "Medals with ribbons", category: "Trophies & medals", sub: "Medals", icon: "medal", color: "gold", custom: true, desc: "Medals for sports days, competitions and events with ribbon and customisation options." },
  { id: "p6", name: "Notebooks & registers", category: "Stationery items", sub: "Notebooks", icon: "book", color: "pink", custom: false, desc: "Notebooks, registers and everyday writing essentials for school, college and office use." },
  { id: "p7", name: "Pens, pencils & writing items", category: "Stationery items", sub: "Writing items", icon: "pen", color: "green", custom: false, desc: "Everyday pens, pencils, markers and other writing supplies for students and professionals." },
  { id: "p8", name: "School bags", category: "School bags", sub: "Bags", icon: "bag", color: "orange", custom: false, desc: "Practical school bags in different designs and sizes. Ask on WhatsApp for currently available options." },
  { id: "p9", name: "Desk & office essentials", category: "Office items", sub: "Desk essentials", icon: "office", color: "blue", custom: false, desc: "Useful office items and desk accessories for organised everyday work." },
  { id: "p10", name: "Files, folders & accessories", category: "Office items", sub: "Files & folders", icon: "folder", color: "green", custom: false, desc: "Files, folders and related office supplies for documents, assignments and records." },
  { id: "p11", name: "Photocopy & black-and-white print", category: "Printing services", sub: "Photocopy", icon: "print", color: "blue", custom: true, desc: "Black-and-white photocopy and document printing. Send your document and required quantity on WhatsApp." },
  { id: "p12", name: "Colour printouts", category: "Printing services", sub: "Colour printing", icon: "print", color: "pink", custom: true, desc: "Colour printing for projects, presentations, documents and other requirements." },
  { id: "p13", name: "Marksheets & certificates", category: "Printing services", sub: "Certificate printing", icon: "certificate", color: "gold", custom: true, desc: "Professional printing for marksheets and certificates. Share the final file and printing details on WhatsApp." },
  { id: "p14", name: "Passport photo service", category: "Photo services", sub: "Passport photos", icon: "photo", color: "green", custom: true, desc: "Passport-size photo service for forms, IDs and official requirements." },
  { id: "p15", name: "Glossy photo prints", category: "Photo services", sub: "Glossy photos", icon: "photo", color: "pink", custom: true, desc: "Glossy photo printing in available sizes. Share your image and preferred size on WhatsApp." },
  { id: "p16", name: "Custom T-shirt printing", category: "T-shirt printing", sub: "T-shirt printing", icon: "shirt", color: "orange", custom: true, desc: "Personalised T-shirt printing for names, designs, teams, events and gifting." },
  { id: "p17", name: "T-shirt painting", category: "T-shirt printing", sub: "T-shirt painting", icon: "shirt", color: "pink", custom: true, desc: "Creative T-shirt painting based on your design idea. Discuss colours, size and artwork on WhatsApp." },
];

export type Product = (typeof products)[number];
