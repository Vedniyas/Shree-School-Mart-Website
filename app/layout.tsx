import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Shree School Mart | Udaipura',description:'Trophies, medals, ID and PVC cards, stationery, school bags, office items, photocopy, photo services and custom printing in Udaipura.',icons:{icon:'/shree-school-mart-logo.jpeg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
