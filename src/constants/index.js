
const navlinks = [
    { id: 1, title: "About", url: "about" },
]

const restLinks = [
    { id: 1, title: "Dextools", url: "https://www.dextools.io/app/en/ether/pair-explorer/0x6cfe13635a4350a2a39ee1f389ec21dbed433c85" },
    { id: 2, title: "Community", url: "#" },
    { id: 3, title: "Twitter", url: "#" },
    { id: 4, title: "Enter App", url: "#" },
]

// const mobileNavlinks = [
//     { id: 1, title: "About", url: "" },
//     // { id: 2, title: "Explore", url: "" },
//     // { id: 3, title: "Favorites", url: "" },
//     // { id: 4, title: "Wallet", url: "" },
//     // { id: 5, title: "About", url: "" },
//     // { id: 6, title: "Faqs", url: "" },
// ]
const UnixTimestampConverter = ({ unixTimestamp }) => {
    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };

export { navlinks, restLinks , UnixTimestampConverter}