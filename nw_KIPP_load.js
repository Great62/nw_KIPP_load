async function init() {
  try {
    console.log('Fetching KIPP loader data...')
    const response = await fetch(
      `https://us-central1-sales-chatbot-f1521.cloudfunctions.net/fetchKIPPLoadData`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostname: window.location.hostname,
        }),
      }
    );
    let data = await response.json();
  
    const scriptURL = data.cdnLink;
  
    if (document.readyState === "loading") {
      // The DOM is not yet fully loaded
      document.addEventListener("DOMContentLoaded", () => {
        // update the window object with the bot data
        window.nwKIPPData = {
          clientId: data.clientId,
          shopProvider: data.shopProvider,
          colours: data.colours,
          faq: data.faq,
          contactBtnUrl: data.contactBtnUrl,
        }

        insertScript(scriptURL);
        document.removeEventListener("DOMContentLoaded", insertScript);
      });
    } else {
      // The DOM is already fully loaded
      insertScript(scriptURL);
    }
    
    console.log('KIPP loader data: ', `inserted script ${scriptURL}`);
  } catch (error) {
    console.log('KIPP loader error: ', error);
  }
}

init();

const insertScript = (src) => {
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.defer = true;
  document.body.appendChild(script);
}