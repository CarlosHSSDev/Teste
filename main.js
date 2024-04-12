const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    // ...
    webVersion: '2.2409.2',
    authStrategy: new LocalAuth(),
    webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
    }
  });

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Objeto para armazenar os animes por dia da semana
let lista = {
    "Domingo": ["*Mushoku Tensei II: Isekai Ittara Honki Dasu Part 2*", "\n*Tensei Kizoku, Kantei Skill de Nariagaru*", "\n*Shinigami Bocchan to Kuro Maid 3*", "\n*Jiisan Baasan Wakagaeru*", "\n*Vampire Dormitory*", "\n*Yozakura-san Chi no Daisakusen*", "\n*Yozakura-san Chi no Daisakusen*", "\n*Hibike! Euphonium 3*", "\n*Ninja Kamui*"],
    "Segunda": ["*Blue Archive The Animation*", "\n*Ookami to Koushinryou: Merchant Meets the Wise...*", "\n*Dekisokonai to Yobareta Motoeiyuu wa Jikka kara Tsu...*", "\n*Re:Monster*", "\n*Tensei Shitara Dainana Ouji Datta*", "\n*Kami wa Game ni Ueteiru*", "\n*Shuumatsu Train Doko e Iku?*", "\n*Tsuki ga Michibiku Isekai Douchuu 2*", "\n*Ao no Orchestra*"],
    "Terça": ["*Rinkail*", "\n*Boukyaku Battery*", "\n*Unnamend Memory*"],
    "Quarta": ["*Kenka Dokugaku*", "\n*Seiyuu Radio no Uraomote*", "\n*Kaii to Otome to Kamikakushi*", "\n*Bartender: Kami no Glass*", "\n*Kono Subarashii Sekai ni Shukufuku wo! 3*", "\n*Kono Subarashii Sekai ni Shukufuku wo! 3*"],
    "Quinta": ["*Yuru Camp△ 3*", "\n*Henjin no Salad Bowl*", "\n*Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?*", "\n*Hananoi-kun to Koi no Yamai*", "\n*Wind Breaker*", "\n*Dungeon Meshi*"],
    "Sexta": ["*Mahouka Koukou no Rettousei 3*", "\n*Tensei shitara Slime Datta Ken 3*", "\n*Ooi! Tonbo*", "\n*Astro Note*", "\n*Highspeed Etoile*", "\n*Girls Band Cry*", "\n*Pokémon Horizons: The Series*"],
    "Sábado": ["*Dragon Raja*", "\n*Boku no Hero Academia: Memories*", "\n*Tonari no Youkai-san*", "\n*Karasu wa Aruji wo Erabanai*", "\n*One Room, Hiatari Futsuu, Tenshi-tsuki*", "\n*Bucchigiri?!*", "\n*One Piece*"]
};

const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const dataAtual = new Date();
const diaSemanaNumero = dataAtual.getDay();
const diaSemanaNome = diasDaSemana[diaSemanaNumero];

client.on('message_create', message => {
    if (!message.fromMe) {
        if (message.body.toLocaleLowerCase() === "/swift") {
            setTimeout(() => {
                client.sendMessage(message.from, 'Olá, me chamou? Tenho um pouco de dificuldade de entender o que você fala ainda... Meu criador está ocupado e ainda não me terminou. Por favor use uma dessas opções abaixo para que eu possa continuar nossa conversa:\n[ 1 ] *Animes do Dia*');
            }, 1000); // Atraso de 1 segundo
        } else if (message.body.toLocaleLowerCase() === 'animes do dia' || message.body.toLocaleLowerCase() === "1") {
            setTimeout(() => {
                client.sendMessage(message.from, "Esta é a sua lista de animes do dia:");
            }, 1000); // Atraso de 1 segundo
            setTimeout(() => {
                // Recupera a lista de animes para a Segunda
                const animesSegunda = lista[diaSemanaNome];
                // Envia os animes para o remetente
                client.sendMessage(message.from, animesSegunda.join('\n'));
            }, 1000); // Atraso de 1 segundo
            // Adicione outros casos conforme necessário
        } else {
            setTimeout(() => {
                client.sendMessage(message.from, "Peço desculpas, mas a única coisa que consigo fazer no momento é te entregar a lista de animes do dia, digite /swift para ver uma mini boas vindas, ou 1 para visualizar os animes do dia! *Muito Obrigado Pela Paciência*");
            }, 1000); // Atraso de 1 segundo
        }
    }
});

client.initialize();
