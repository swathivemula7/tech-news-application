// const axios = require('axios');
// const fs = require('fs');

// async function main() {
//     const newsAPIKey = ''; // Hidden
//     const headlines = {
//         "TechnologyNews": [],
//         "TechIndustry": [],
//         "InnovationTrends": [],
//         "GadgetsDevices": []
//     };


//     const categories = {
//         "TechnologyNews": "AI OR Quantum OR Blockchain OR BitCoin OR Cryptocurrency OR IoT",
//         "TechIndustry": "Software  OR Programming  OR Coding  OR Online Tools  OR software development",
//         "InnovationTrends": "Startup OR Technology Innovation OR Technology Research OR Tesla OR Google OR Microsoft OR MNC",
//         "GadgetsDevices": "Gadgets OR Electronics OR Smart OR Iphone OR Samsung OR Vivo OR Google glasses"
//     };


//     // Fetch news for each category
//     for (const category in categories) {
//         const query = categories[category];
//         try {
//             const response = await axios.get(`https://newsapi.org/v2/everything`, {
//                 params: {
//                     q: query,
//                     pageSize: 7,
//                     sortBy: 'publishedAt',
//                     apiKey: newsAPIKey
//                 }
//             });
//             const articles = response.data.articles;
            

//             articles.forEach((article, index) => {
//                 headlines[category][index] = {
//                     title: trimEndLine(article.title),
//                     url: article.url
//                 };
//                 // if (index === 0) {
//                 //     headlines[category].img = article.urlToImage;
//                 // }
//             });
//         } catch (error) {
//             console.error(`Error fetching news for ${category}:`, error.message);
//         }
//     }

//     console.log(headlines);

//     fs.writeFileSync("finalTechNews.json", JSON.stringify(headlines, null, 2));
    
//     fs.readFile('./finalTechNews.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading the JSON file:", err);
//             return;
//         }
    
//         // Parse the JSON data
//         const jsonData = JSON.parse(data);
    
//         // Convert JSON data to JavaScript object string
//         const jsData = `const headlines = ${JSON.stringify(jsonData, null, 2)};\n\nexport default headlines;\n`;
    
//         // Write to the finalData.js file
//         fs.writeFile('./finalData.js', jsData, 'utf8', (err) => {
//             if (err) {
//                 console.error("Error writing the JavaScript file:", err);
//             } else {
//                 console.log("JavaScript file has been generated successfully.");
//             }
//         });
//     });


//     function trimEndLine(headline){
//         let newstr = "";
//         for( let i = 0; i < headline.length; i++ ) 
//             if( !(headline[i] == '\n' || headline[i] == '\r') )
//                 newstr += headline[i];
                
//         return newstr;
//     }

// }

// main();





// const axios = require('axios');
// const fs = require('fs');

// // Use environment variables for sensitive data
// const newsAPIKey = 'd99f3f75e8754375a41cd197e67b3057'; // Replace with your NewsAPI key

// async function fetchNews(query, apiKey, pageSize = 10, page = 1) {
//     const maxRetries = 3; // Number of retries
//     let attempt = 0;

//     while (attempt < maxRetries) {
//         try {
//             console.log(`Fetching page ${page} for query: ${query}`);
//             const response = await axios.get('https://newsapi.org/v2/everything', {
//                 params: {
//                     q: query,
//                     pageSize: pageSize,
//                     page: page,
//                     sortBy: 'publishedAt',
//                     apiKey: apiKey,
//                     from: '2024-08-09', // Adjust these dates as needed
//                     to: '2024-08-11'
//                 }
//             });
//             return response.data.articles || [];
//         } catch (error) {
//             attempt++;
//             console.error(`Error fetching news for query ${query}: ${error.message}. Attempt ${attempt} of ${maxRetries}`);
//             if (attempt >= maxRetries) {
//                 console.error('Max retries reached. Returning empty results.');
//                 return [];
//             }
//             // Optionally add a delay before retrying
//             await new Promise(resolve => setTimeout(resolve, 2000));
//         }
//     }
// }

// async function main() {
//     const headlines = {
//         "TechnologyNews": [],
//         "TechIndustry": [],
//         "InnovationTrends": [],
//         "GadgetsDevices": []
//     };

//     const categories = {
//         "TechnologyNews": "AI advancements OR Quantum computing OR Blockchain developments",
//         "TechIndustry": "Software updates OR Programming languages OR Tech industry news",
//         "InnovationTrends": "Startup innovations OR Tech entrepreneurship OR Tech Research",
//         "GadgetsDevices": "Latest gadgets OR Consumer electronics OR Smart devices"
//     };

//     const filters = {
//         "TechnologyNews": ["AI", "Quantum", "Blockchain","BitCoin","Cryptocurrency","IoT","Cyber Security"],
//         "TechIndustry": ["Software", "Programming","Coding","Online Tools","software development"],
//         "InnovationTrends": ["Startup", "Technology Innovation", "Technology Research","Tesla","Google","Microsoft","MNC"],
//         "GadgetsDevices": ["Gadgets", "Electronics", "Smart","Iphone","Samsung","Vivo","Google glasses"]
//     };

//     // Fetch news for each category
//     for (const category in categories) {
//         const query = categories[category];
//         const keywords = filters[category]; // Get the correct keywords for the current category

//         let allArticles = [];
//         let page = 1;
//         const pageSize = 10; // Number of articles per page
//         let matchingArticles = [];

//         // Fetch news pages until we have at least 7 matching articles
//         while (matchingArticles.length < 7) {
//             const articles = await fetchNews(query, newsAPIKey, pageSize, page);
//             if (articles.length === 0) break; // Exit if no articles are returned

//             // Filter articles based on keywords
//             const filteredArticles = filterArticles(articles, keywords);

//             // Collect matching articles
//             matchingArticles = matchingArticles.concat(filteredArticles);

//             // Increment page
//             page++;
//         }

//         // Store the top 7 filtered articles in headlines
//         matchingArticles.slice(0, 7).forEach((article, index) => {
//             headlines[category][index] = {
//                 title: trimEndLine(article.title),
//                 url: article.url
//             };
//         });
//     }

//     console.log(headlines);

//     fs.writeFileSync("finalTechNews.json", JSON.stringify(headlines, null, 2));

//     fs.readFile('./finalTechNews.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading the JSON file:", err);
//             return;
//         }

//         // Parse the JSON data
//         const jsonData = JSON.parse(data);

//         // Convert JSON data to JavaScript object string
//         const jsData = `const headlines = ${JSON.stringify(jsonData, null, 2)};\n\nexport default headlines;\n`;

//         // Write to the finalData.js file
//         fs.writeFile('./finalData.js', jsData, 'utf8', (err) => {
//             if (err) {
//                 console.error("Error writing the JavaScript file:", err);
//             } else {
//                 console.log("JavaScript file has been generated successfully.");
//             }
//         });
//     });

//     function trimEndLine(headline) {
//         return headline.replace(/[\n\r]/g, ''); // Simplified newline trimming
//     }

//     function filterArticles(articles, keywords) {
//         return articles.filter(article =>
//             keywords.some(keyword => article.title.includes(keyword) || article.description.includes(keyword))
//         );
//     }
// }

// main();

const axios = require('axios');
const fs = require('fs');

// Use environment variables for sensitive data
const newsAPIKey ='90ee8b576f49498186e8c4227c8e2f29'; // Replace with your NewsAPI key

async function fetchNews(query, apiKey, pageSize = 25, page = 1) {
    const maxRetries = 3; // Number of retries
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            console.log(`Fetching page ${page} for query: ${query}`);
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: query,
                    pageSize: pageSize,
                    page: page,
                    sortBy: 'publishedAt',
                    apiKey: apiKey,
                  
                }
            });
            return response.data.articles || [];
        } catch (error) {
            attempt++;
            console.error(`Error fetching news for query ${query}: ${error.message}. Attempt ${attempt} of ${maxRetries}`);
            if (attempt >= maxRetries) {
                console.error('Max retries reached. Returning empty results.');
                return [];
            }
            // Optionally add a delay before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

async function main() {
    const headlines = {
        "TechnologyNews": [],
        "TechIndustry": [],
        "InnovationTrends": [],
        "GadgetsDevices": []
    };

    const categories = {
        "TechnologyNews": "AI advancements OR Quantum computing OR Blockchain developments",
        "TechIndustry": "Software updates OR Programming languages OR Tech industry news",
        "InnovationTrends": "Startup innovations OR Tech entrepreneurship OR Tech Research",
        "GadgetsDevices": "Latest gadgets OR Consumer electronics OR Smart devices"
    };

    const filters = {
        "TechnologyNews": ["AI", "Quantum", "Blockchain", "BitCoin", "Cryptocurrency", "IoT", "Cyber Security"],
        "TechIndustry": ["Software", "Programming","Technology Research","technology","laptops","mobile", "Tesla", "Google", "Coding","MNC","Bitcoin","Cyber", "Blockchain","Online Tools", "software development","recession"],
        "InnovationTrends": ["Startup", "Technology Innovation", "Microsoft", "MNC"],
        "GadgetsDevices": ["Gadgets", "Electronics", "Smart", "Iphone", "Samsung", "Vivo", "Google glasses","laptop","laptops","mobile"]
    };

    // Fetch news for each category
    for (const category in categories) {
        const query = categories[category];
        const keywords = filters[category]; // Get the correct keywords for the current category

        let allArticles = [];
        let page = 1;
        const pageSize = 25; // Number of articles per page
        let matchingArticles = [];

        // Fetch news pages until we have at least 7 matching articles
        while (matchingArticles.length < 7) {
            const articles = await fetchNews(query, newsAPIKey, pageSize, page);
            if (articles.length === 0) break; // Exit if no articles are returned

            // Filter articles based on keywords
            const filteredArticles = filterArticles(articles, keywords);

            // Collect matching articles
            matchingArticles = matchingArticles.concat(filteredArticles);

            // Increment page
            page++;
        }

        // If fewer than 7 matching articles are found, fill with default entries
        while (matchingArticles.length < 7) {
            matchingArticles.push({
                title: "No relevant news available",
                url: ''
            });
        }

        // Store the top 7 articles in headlines
        headlines[category] = matchingArticles.slice(0, 7).map((article) => ({
            title: trimEndLine(article.title),
            url: article.url
        }));
    }

    console.log(headlines);

    // Save news to JSON file
    fs.writeFileSync("finalTechNews.json", JSON.stringify(headlines, null, 2));

    // Convert JSON data to JavaScript module
    fs.readFile('./finalTechNews.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the JSON file:", err);
            return;
        }

        const jsonData = JSON.parse(data);
        const jsData = `const headlines = ${JSON.stringify(jsonData, null, 2)};\n\nexport default headlines;\n`;

        fs.writeFile('./finalData.js', jsData, 'utf8', (err) => {
            if (err) {
                console.error("Error writing the JavaScript file:", err);
            } else {
                console.log("JavaScript file has been generated successfully.");
            }
        });
    });

    function trimEndLine(headline) {
        return headline.replace(/[\n\r]/g, ''); // Simplified newline trimming
    }

    function filterArticles(articles, keywords) {
        return articles.filter(article => {
            const title = article.title || '';
            const description = article.description || '';
           
            return keywords.some(keyword => 
                title.includes(keyword) || description.includes(keyword)
            );
        
        });
    }
    
}

main();

