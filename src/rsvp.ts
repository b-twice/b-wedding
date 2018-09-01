
class FormData  {
    guest:string;
    response:string;
    constructor(
        guest:string = '',
        response:string = ''
    ) {
        this.guest = guest;
        this.response = response;
    }
}

interface FormElements extends HTMLFormControlsCollection{
    guest: HTMLInputElement;
    response: HTMLInputElement;
}

function handleResponse(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    else {
        return response.json();
    }
}

function postData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data), 
    })
    .then(response => handleResponse(response));
}


// NOTES 
// Bit messier then anticipated to handle the various actions/responses
// Mainly in regards to handling displaying/hiding elements
export default function rsvp() {
    
    let loading = document.getElementById("loading");
    let form = document.querySelector("form");
    let responseError = document.getElementById('rsvp-error');
    form.addEventListener("submit", event => {
        event.preventDefault();
        let formElements: FormElements = <FormElements> form.elements;
        let data: FormData = new FormData(formElements.guest.value, formElements.response.value);
        form.classList.toggle('d-none');
        loading.classList.toggle('d-none')
        responseError.classList.add('d-none');

        // sounds crazy, but set a small timeout to give the appearance of loading
        setTimeout(() => {
            postData(`rsvp`, data)
                .then(
                    resp => {
                        loading.classList.toggle('d-none');
                        let responseSuccess = document.getElementById('rsvp-success');
                        responseSuccess.classList.toggle('d-none');
                        if (data.response === 'No'){
                            responseSuccess.innerText = "Sorry to see you can't attend. Thank you for checking out our site and see you another time! \n-Shannon & Brian"
                        }
                        else {
                            responseSuccess.innerText = "Thank you! Glad you can make it and look forward to celebrating with you!\n- Shannon & Brian"
                        }
                    }
                ) 
                .catch(error => {
                    console.error(`RSVP Error: ${error}`);
                    form.classList.toggle('d-none');
                    loading.classList.toggle('d-none');
                    responseError.innerText = error;
                    responseError.classList.remove('d-none');
                });
        }, 500);
    });
}