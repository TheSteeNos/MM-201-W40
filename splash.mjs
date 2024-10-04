import { ANSI } from "./ansi.mjs";

const ART = `
${ANSI.COLOR.RED} ______  ____   __     ${ANSI.COLOR.BLUE} ______   ____    __    ${ANSI.COLOR.YELLOW}  ______   ___     ___
${ANSI.COLOR.RED}|      ||    | /  ]    ${ANSI.COLOR.BLUE}|      | /    |  /  ]   ${ANSI.COLOR.YELLOW} |      | /   \\   /  _]
${ANSI.COLOR.RED}|      | |  | /  /     ${ANSI.COLOR.BLUE}|      ||  o  | /  /    ${ANSI.COLOR.YELLOW} |      ||     | /  [_
${ANSI.COLOR.RED}|_|  |_| |  |/  /      ${ANSI.COLOR.BLUE}|_|  |_||     |/  /     ${ANSI.COLOR.YELLOW} |_|  |_||  O  ||    _]
${ANSI.COLOR.RED}  |  |   |  /   \\_       ${ANSI.COLOR.BLUE}|  |  |  _  /   \\_  ${ANSI.COLOR.YELLOW}     |  |  |     ||   [_
${ANSI.COLOR.RED}  |  |   |  \\     |      ${ANSI.COLOR.BLUE}|  |  |  |  \\     | ${ANSI.COLOR.YELLOW}     |  |  |     ||     |
${ANSI.COLOR.RED}  |__|  |____\\____|      ${ANSI.COLOR.BLUE}|__|  |__|__|\\____| ${ANSI.COLOR.YELLOW}     |__|   \\___/ |_____|
${ANSI.RESET}
`;

function showSplashScreen() {
    console.log(ART);
}

export default showSplashScreen;