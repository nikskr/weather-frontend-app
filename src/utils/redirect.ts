import { StorageService } from "../service/StorageService"

interface ISpaRedirect {
    path: string,
    hash?: string,
    query?: object
}

export const getRedirectPath = () => {
    const spaRedirect = StorageService.get<ISpaRedirect>('spa-redirect');
    
    if (spaRedirect && spaRedirect.path) {
        StorageService.remove('spa-redirect')
        return spaRedirect.path
    } else {
        return ''
    }
}