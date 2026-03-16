import { Client, Databases, Query, ID, Account } from 'appwrite';


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; 
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm),
    ])

    if(result.documents.length > 0) {
        const doc = result.documents[0];

        await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
            count: doc.count + 1,
        }) 
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            })
        }
    } catch (error) {
        console.error(error);
    }}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents;
    } catch (error) {
        console.error(error);
    }
}

export const account = new Account(client);

export const toggleFavorite = async (movie, userId) => {
  try {

    const result = await database.listDocuments(
      DATABASE_ID,
      FAVORITES_COLLECTION_ID,
      [
        Query.equal("user_id", userId),
        Query.equal("movie_id", movie.id)
      ]
    )

    if (result.documents.length > 0) {

      await database.deleteDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        result.documents[0].$id
      )

    } else {

      await database.createDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        ID.unique(),
        {
          user_id: userId,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title
        }
      )
    }

  } catch (error) {
    console.error(error)
  }
}

export const getFavorites = async (userId) => {
  try {

    const result = await database.listDocuments(
      DATABASE_ID,
      FAVORITES_COLLECTION_ID,
      [
        Query.equal("user_id", userId)
      ]
    )

    return result.documents

  } catch (error) {
    console.error(error)
    return []
  }
}

