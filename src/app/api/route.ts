export async function GET(req: Request) {
  const responseTexts = ['Carpe Diem', 'Hakuna Matata'];
  const randomIndex = Math.floor(Math.random() * responseTexts.length);
  const responseText = responseTexts[randomIndex];

  await sleep(5000);
  return new Response(responseText);
}

const sleep = async (msec: number) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};
