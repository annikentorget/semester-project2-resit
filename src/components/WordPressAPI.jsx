const WordPressAPI = {
    fetchPosts: async (searchQuery) => {

            const encodedSearchQuery = encodeURIComponent(searchQuery);


        const apiUrl = `https://anniken.nordloutvikling.no/wp-json/wp/v2/posts?_embed&per_page=50&search=${encodedSearchQuery}&searchFields=title`;

        try {
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();

                console.log(data);

                return data;
            }

            throw new Error('Failed to fetch data.');
        } catch (error) {
            throw error;
        }

    },

    createPost: async (postData) => {
        const apiUrl = 'https://anniken.nordloutvikling.no/wp-json/wp/v2/posts';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`annikenutv:je2g1lsNECNz9nReynqFCdTT`)}`,
                },
                body: JSON.stringify({
                    ...postData,
                    status: 'publish'
                }),
            });

            if (response.ok) {
                const newArticleData = await response.json();
                return newArticleData;
            }

         } catch (error) {
            throw error;
         }
    },

    deleteArticle: async (id) => {
        
        const response = await fetch(`https://anniken.nordloutvikling.no/wp-json/wp/v2/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`annikenutv:je2g1lsNECNz9nReynqFCdTT`)}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`FAILED ${id} Error: ${errorText}`)
            throw new Error(`Failed to delete article with ID ${id}`);
        }
    },

    editPost: async (id, data) => {
        const apiUrl = `https://anniken.nordloutvikling.no/wp-json/wp/v2/posts/${id}`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${btoa(`annikenutv:je2g1lsNECNz9nReynqFCdTT`)}`,
                },
                body: JSON.stringify({
                    ...data,
                    status: 'publish'
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data);
                return {
                    title: data.title.rendered,
                    content: data.content.rendered,
                    excerpt: data.excerpt.rendered,
                    image_url: data.acf.image_url,
                };
            }

            throw new Error('Failed to fetch post details.');
        } catch (error) {
            throw error;
        }
    },
};

export default WordPressAPI;