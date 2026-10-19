// Lens definitions and the 8 eras x 4 lenses of content.
// Each entry: year, when (display date), title, scene (key in src/scenes/scenes.js), body (synopsis).
export const LENS = {
  conflict:{name:'Conflict',  c:'#e4644c'},
  economy: {name:'Economy',   c:'#e8b34e'},
  science: {name:'Science & Tech', c:'#5ccbc4'},
  society: {name:'Society',   c:'#b9a0ef'}
};
export const ORDER = ['conflict','economy','science','society'];

export const ERAS = [
 {label:'2020s', def:'society', e:{
  conflict:{year:2022, when:'24 February 2022', title:'War returns to Europe', scene:'ukraine',
    body:'Russia launched a full-scale invasion of Ukraine, eight years after seizing Crimea. Ukraine held Kyiv and pushed back, but the fighting settled into a grinding war of drones, artillery and trenches. Millions fled, and Europe rearmed on a scale not seen since the Cold War.'},
  economy:{year:2020, when:'2020', title:'The pandemic shock', scene:'pandemic',
    body:'Lockdowns shut factories, shops and borders at the same time. The world economy shrank by about 3% in 2020, the sharpest fall since the Great Depression. Governments spent trillions to cushion the blow, and a burst of inflation followed as demand roared back.'},
  science:{year:2020, when:'December 2020', title:'A vaccine in under a year', scene:'mrna',
    body:'Less than a year after the new coronavirus was identified, the first mRNA vaccines were approved. Decades of quiet research paid off in months, and billions of doses followed. Two years later, ChatGPT put generative AI into everyday hands.'},
  society:{year:2020, when:'March 2020', title:'The world stays home', scene:'lockdown',
    body:'When COVID-19 was declared a pandemic, billions of people were told to stay home. Schools moved online, offices emptied and families met through screens. The World Health Organization later estimated nearly 15 million excess deaths in 2020 and 2021.'}
 }},
 {label:'2000s', def:'economy', e:{
  conflict:{year:2001, when:'11 September 2001', title:'9/11 and the War on Terror', scene:'nine11',
    body:'Hijacked airliners struck New York and Washington, killing nearly 3,000 people. The United States led an invasion of Afghanistan that year and of Iraq in 2003, opening two decades of war that reshaped the Middle East and security at home.'},
  economy:{year:2008, when:'September 2008', title:'The Global Financial Crisis', scene:'gfc',
    body:'The US housing bubble burst, and when Lehman Brothers collapsed on 15 September 2008, credit froze across the world. Governments bailed out banks, stock markets lost around half their value, and the Great Recession followed: the deepest downturn since the 1930s.'},
  science:{year:2007, when:'January 2007', title:'A computer in every pocket', scene:'iphone',
    body:'Apple unveiled the iPhone, a phone built around a touchscreen and the internet, and rivals followed fast. Within a decade billions of people carried a smartphone, changing how we work, shop, meet and get our news.'},
  society:{year:2008, when:'4 November 2008', title:'Obama is elected', scene:'obama',
    body:'Barack Obama won the US presidency, the first Black American to hold the office. His campaign was powered by small online donations and social media, a playbook that changed how politics is done everywhere.'}
 }},
 {label:'1978–94', def:'conflict', e:{
  conflict:{year:1989, when:'9 November 1989', title:'The Berlin Wall falls', scene:'wall',
    body:'After weeks of protest, East German guards opened the border crossings and crowds climbed onto the wall that had split Berlin for 28 years. Germany reunited within a year, and in 1991 the Soviet Union itself dissolved, ending the Cold War.'},
  economy:{year:1978, when:'December 1978', title:'China opens up', scene:'china',
    body:'Deng Xiaoping began reforms that let farmers sell their surplus and invited foreign investment into special economic zones. Over the next four decades China became the world’s factory, and hundreds of millions of people left extreme poverty.'},
  science:{year:1991, when:'August 1991', title:'The World Wide Web', scene:'web',
    body:'Tim Berners-Lee, a scientist at CERN, proposed a system of linked pages in 1989 and opened it to the public in 1991. CERN made it free for anyone to use in 1993, and the web grew from a handful of sites into the backbone of modern life.'},
  society:{year:1994, when:'27 April 1994', title:'Apartheid ends', scene:'mandela',
    body:'Black South Africans voted in a national election for the first time, and Nelson Mandela, freed after 27 years in prison, became president. A system of legal racial segregation ended through negotiation instead of civil war.'}
 }},
 {label:'1960s–70s', def:'science', e:{
  conflict:{year:1969, when:'1969', title:'Vietnam at its peak', scene:'vietnam',
    body:'By April 1969 more than 540,000 American troops were in Vietnam. The war was on television every night and protests spread across campuses worldwide. It ended in 1975 with the fall of Saigon, after millions of deaths.'},
  economy:{year:1973, when:'October 1973', title:'The oil shock', scene:'oil',
    body:'Arab oil producers cut supplies to countries backing Israel in the Yom Kippur War, and oil prices roughly quadrupled within months. Queues formed at petrol stations, inflation soared, and the long post-war boom in the West came to an end.'},
  science:{year:1969, when:'20 July 1969', title:'One small step: Apollo 11', scene:'apollo',
    body:'Neil Armstrong and Buzz Aldrin landed on the Moon while Michael Collins circled above. Around 600 million people watched the grainy live broadcast. It was the defining moment of the Space Race, a Cold War rivalry that briefly turned into shared wonder.'},
  society:{year:1963, when:'28 August 1963', title:'The March on Washington', scene:'march',
    body:'About 250,000 people gathered at the Lincoln Memorial to demand jobs and freedom, and Martin Luther King Jr. spoke of his dream. Within two years the Civil Rights Act and the Voting Rights Act outlawed segregation and racial barriers to voting in the US.'}
 }},
 {label:'1940s', def:'conflict', e:{
  conflict:{year:1945, when:'May – September 1945', title:'The Second World War ends', scene:'ww2end',
    body:'Germany surrendered in May. After the United States dropped atomic bombs on Hiroshima and Nagasaki in August, Japan surrendered in September. The deadliest war in history had killed an estimated 70–85 million people and left the US and USSR as rival superpowers.'},
  economy:{year:1944, when:'July 1944', title:'Bretton Woods', scene:'bretton',
    body:'Delegates from 44 Allied nations met in New Hampshire to design the post-war economy. They created the IMF and the World Bank and pegged currencies to the US dollar, which was tied to gold. The system anchored world trade until 1971.'},
  science:{year:1947, when:'December 1947', title:'The transistor', scene:'transistor',
    body:'At Bell Labs, three physicists built a tiny switch from germanium that could replace bulky vacuum tubes. The transistor made portable radios, computers and eventually smartphones possible. A modern chip holds billions of them.'},
  society:{year:1947, when:'August 1947', title:'Independence and Partition', scene:'partition',
    body:'Britain left India, which was divided into India and Pakistan. Independence came with one of the largest migrations in history: an estimated 10 to 20 million people crossed the new borders amid violence that killed hundreds of thousands. Decolonisation soon swept Asia and Africa.'}
 }},
 {label:'1930s', def:'economy', e:{
  conflict:{year:1939, when:'1 September 1939', title:'The Second World War begins', scene:'ww2start',
    body:'Germany invaded Poland, and Britain and France declared war two days later. Within two years the fighting stretched across Europe, North Africa and the Pacific, drawing in most of the world’s nations.'},
  economy:{year:1929, when:'October 1929', title:'The Wall Street Crash', scene:'crash1929',
    body:'In a few days of panic selling in late October, billions of dollars vanished from the New York Stock Exchange. Banks failed, world trade collapsed and the Great Depression spread across the globe. By 1933 about a quarter of American workers had no job.'},
  science:{year:1928, when:'September 1928', title:'Penicillin', scene:'penicillin',
    body:'Alexander Fleming noticed that a mould growing on one of his dishes had killed the bacteria around it. Mass-produced from the 1940s, penicillin became the first widely used antibiotic and has saved millions of lives.'},
  society:{year:1930, when:'March – April 1930', title:'The Salt March', scene:'saltmarch',
    body:'Mohandas Gandhi walked about 390 km to the sea at Dandi to make salt in defiance of a British tax. Tens of thousands were arrested in the protests that followed, and non-violent mass resistance became a model for movements around the world.'}
 }},
 {label:'1910s–20s', def:'conflict', e:{
  conflict:{year:1914, when:'28 July 1914', title:'The First World War', scene:'ww1',
    body:'A month after Archduke Franz Ferdinand was assassinated in Sarajevo, Austria-Hungary declared war on Serbia and alliances dragged Europe in. Four years of industrial war followed, killing around 20 million people and ending four empires.'},
  economy:{year:1923, when:'November 1923', title:'Hyperinflation in Germany', scene:'hyper',
    body:'Weighed down by war debts and reparations, Germany printed money until it was almost worthless. At the peak, one US dollar bought 4.2 trillion marks and workers carried their wages home in baskets. Middle-class savings were wiped out.'},
  science:{year:1915, when:'November 1915', title:'General relativity', scene:'relativity',
    body:'Albert Einstein described gravity as mass bending space and time. A solar eclipse in 1919 confirmed that starlight curves around the Sun, and the theory now keeps GPS satellites accurate to within metres.'},
  society:{year:1918, when:'1918 – 1920', title:'The great influenza', scene:'flu',
    body:'A new flu spread with troops and trade at the end of the war, infecting perhaps a third of the world’s population. Estimates of the dead range from 17 to 50 million or more, rivalling or exceeding the toll of the war itself.'}
 }},
 {label:'1900s', def:'science', e:{
  conflict:{year:1905, when:'May 1905', title:'Japan defeats Russia', scene:'tsushima',
    body:'At the Battle of Tsushima, Japan’s navy destroyed a Russian fleet that had sailed halfway around the world. It was the first time in the modern era that an Asian power had beaten a European one, and it shook the confidence of empires.'},
  economy:{year:1908, when:'October 1908', title:'The Model T', scene:'fordT',
    body:'Henry Ford sold a simple, sturdy car that ordinary families could afford. When his moving assembly line arrived in 1913, building one went from about 12 hours to about 90 minutes, and mass production remade industry everywhere.'},
  science:{year:1903, when:'17 December 1903', title:'The first powered flight', scene:'flight',
    body:'At Kitty Hawk, North Carolina, Orville and Wilbur Wright flew a powered aeroplane for 12 seconds. Sixty-six years later, people would walk on the Moon.'},
  society:{year:1906, when:'1906', title:'Finnish women win the vote', scene:'suffrage',
    body:'Finland became the first country in Europe to give women the vote, and the first in the world to let them stand for parliament. New Zealand had granted the vote in 1893, and suffrage campaigns spread through the century.'}
 }}
];

