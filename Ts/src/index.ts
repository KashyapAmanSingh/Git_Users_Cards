


const getUsername = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;

const main_cont = document.querySelector(".main_container") as HTMLElement;

//pbject contain_types interfaces
interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  url: string;
}

async function myCustomFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Network Error: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

function showResult(data_result: UserData) {
  const { login, avatar_url, location, url } = data_result;
  // console.log(data_result.id);
 main_cont.insertAdjacentHTML(          //settimeout for checking only remove this please 
    "beforeend",
    `
               <div class='card'>
               <img src=${avatar_url} alt=${login} />
               </img>
               <hr/>
               <div class='card-footer'>
               <img src=${avatar_url} alt=${login} />
               <h5> My Name - ${login} </h5>
                <a href="${url}">Github </a>
                <div />
                <div />
            `
  );

}

async function fetchUserData(url: string) {
  const datas = await myCustomFetcher<UserData[]>(url, {}); //UserData[] as our fetched data is in array of object and UserData is already a object so we need to do inly UserData[] mean array of object
  console.log(datas);
  datas.map((data_result) => showResult(data_result));
}

// default functioncalll
fetchUserData("https://api.github.com/users");

//form search

formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = getUsername.value.toLowerCase();
  try {
    const url = `https://api.github.com/users`;
    const allUserData = await myCustomFetcher<UserData[]>(url, {});

    const matchingUsers = allUserData.filter((user) => user.login.toLowerCase().includes(searchTerm)); //filter on basis of user name
    main_cont.innerHTML = ""; //clear previous data
    if (matchingUsers.length === 0) {
      main_cont?.insertAdjacentHTML(
        "beforeend",
        `<p class="empty-msg"> No Matching Users found.... </p>`
      );
    } else {
      matchingUsers.map((data_result) => showResult(data_result));
    }
  } catch (error) {console.log(error);}
});
