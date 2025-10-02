import { firestore, auth } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

const createUser = async (email, password, displayName, userType) => {
  try {
    console.log("Attempting to create user with email:", email);
    console.log("Auth object:", auth);
    console.log("Auth app:", auth?.app);
    
    // Check if auth is properly initialized
    if (!auth) {
      throw new Error("Firebase Auth is not initialized. Please check your Firebase configuration.");
    }
    
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("User created successfully:", user.uid);
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName
    });
    
    console.log("Profile updated with display name:", displayName);
    
    // Add user data to Firestore
    await addDoc(collection(firestore, "users"), {
      uid: user.uid,
      email: email,
      displayName: displayName,
      userType: userType, // 'musician', 'audience', or 'venue'
      createdAt: new Date(),
      profileComplete: false
    });
    
    console.log("User data saved to Firestore");
    
    return { success: true, user: user };
  } catch (error) {
    console.error("Error creating user:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return { success: false, error: error.message };
  }
};

export { getUsers, getArtists, createUser };