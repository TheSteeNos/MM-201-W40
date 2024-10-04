import { ANSI } from "./ansi.mjs";

const ART = `
${ANSI.COLOR.RED} ______  ____   __   ${ANSI.COLOR.GREEN} ______   ____    __   ${ANSI.COLOR.YELLOW} ______   ___     ___    ${ANSI.COLOR.BLUE} __
${ANSI.COLOR.RED}|      ||    | /  ]  ${ANSI.COLOR.GREEN}|      | /    |  /  ]  ${ANSI.COLOR.YELLOW}|      | /   \\   /  _]  ${ANSI.COLOR.BLUE} |  |
${ANSI.COLOR.RED}|      | |  | /  /   ${ANSI.COLOR.GREEN}|      ||  o  | /  /   ${ANSI.COLOR.YELLOW}|      ||     | /  [_    ${ANSI.COLOR.BLUE}|  |
${ANSI.COLOR.RED}|_|  |_| |  |/  /    ${ANSI.COLOR.GREEN}|_|  |_||     |/  /    ${ANSI.COLOR.YELLOW}|_|  |_||  O  ||    _]   ${ANSI.COLOR.BLUE}|  |
${ANSI.COLOR.RED}  |  |   |  /   \\_     ${ANSI.COLOR.GREEN}|  |  |  _  /   \\_ ${ANSI.COLOR.YELLOW}    |  |  |     ||   [_  ${ANSI.COLOR.BLUE}  |__|   
${ANSI.COLOR.RED}  |  |   |  \\     |    ${ANSI.COLOR.GREEN}|  |  |  |  \\     |${ANSI.COLOR.YELLOW}    |  |  |     ||     | ${ANSI.COLOR.BLUE}   __
${ANSI.COLOR.RED}  |__|  |____\\____|    ${ANSI.COLOR.GREEN}|__|  |__|__|\\____|${ANSI.COLOR.YELLOW}    |__|   \\___/ |_____|${ANSI.COLOR.BLUE}   |__|
${ANSI.RESET}
`;

function showSplashScreen() {
    console.log(ART);
}

export default showSplashScreen;