import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const getUsers = async () => {
  const usersCollection = collection(firestore, "users");
  const snapshot = await getDocs(usersCollection);
  snapshot.docs.forEach((doc) => console.log(doc.data()));
};

const getArtists = async () => {
  try {
    const artistsCollection = collection(firestore, "artists");
    const snapshot = await getDocs(artistsCollection);
    const artists = [];
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      
      // Handle arrays for name and description (check both 'Description' and 'description')
      const artistNames = Array.isArray(data.name) ? data.name : [data.name];
      const descriptions = data.Description || data.description;
      const artistDescriptions = Array.isArray(descriptions) ? descriptions : [descriptions];
      
      // Create individual artist objects for each name/description pair
      artistNames.forEach((name, index) => {
        artists.push({
          id: `${doc.id}_${index}`,
          name: name,
          description: artistDescriptions[index] || artistDescriptions[0] || "No description available"
        });
      });
    });
    
    return artists;
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

export { getUsers, getArtists };