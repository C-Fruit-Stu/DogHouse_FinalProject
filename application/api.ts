//const BASE_URL = "https://shenkar-2024-b-fullstack-ui.onrender.com/api";
const BASE_URL = "https://doghouse-la1b.onrender.com/api";

export async function POST(url: string, obj: Object) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        //הסטטוס הוא לא מקבוצת 200
        if (!res.ok) {
            console.log({ res });
            return;
        }

        let data = await res.json();
        return data;

    } catch (error) {
        console.error({ error });
    }
}

export async function GET(url: string) {
    try {
        console.log(`Sending GET request to ${BASE_URL}/${url}`);
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Log the full response
        console.log('Full response:', res);

        // Check if response is not ok (status code outside 200-299 range)
        if (!res.ok) {
            console.error('Response error:', res);
            return;
        }

        // Attempt to parse the response JSON
        let data = await res.json();
        console.log('Parsed JSON data:', data);
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// export async function GET(url: string) {
//     try {
//         let res = await fetch(`${BASE_URL}/${url}`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!res.ok) {
//             console.log('Response error:', res);
//             return;
//         }

//         let data = await res.json();
//         console.log('Data received from server:', data); // Add this
//         return data;

//     } catch (error) {
//         console.error('Error in GET request:', error);
//     }
// }


export async function PUT(url: string, obj: Object) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        //הסטטוס הוא לא מקבוצת 200
        if (!res.ok) {
            console.log({ res });
            return;
        }

        let data = await res.json();
        return data;

    } catch (error) {
        console.error({ error });
    }
}

export async function DELETE(url: string) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        //הסטטוס הוא לא מקבוצת 200
        if (!res.ok) {
            console.log({ res });
            return;
        }

        let data = await res.json();
        return data;

    } catch (error) {
        console.error({ error });
    }
}