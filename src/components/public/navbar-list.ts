import { PATH } from "../../common/enums/path.enum";
import { translation } from "../../common/translation";

interface INavItem {
  title: string;
  path?: string;
  disabled?: boolean;
}

export const navbarList: Array<INavItem> = [
    { title: translation.home, path: PATH.VIDEOS },
    { title: translation.aboutUs,disabled:true },
    {title:translation.faq, disabled:true},
]