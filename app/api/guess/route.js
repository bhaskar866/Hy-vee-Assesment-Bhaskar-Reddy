import { NextResponse } from 'next/server';

export const GET = async (req) => {
    console.log("Request coming...");

    const url = new URL(req.url);
    const name = url.searchParams.get('name');

    console.log("request came:", name);
    if (!name) {
      return NextResponse.json({ error: "Name parameter is required" }, { status: 400 });
    }

    try {
      const [ageRes, genderRes, countryRes] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`),
        fetch(`https://api.genderize.io?name=${name}`),
        fetch(`https://api.nationalize.io?name=${name}`)
      ]);


      const [ageData, genderData, countryData] = await Promise.all([
        ageRes.json(),
        genderRes.json(),
        countryRes.json()
      ]);


      return NextResponse.json({ ageData, genderData, countryData });
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
};
