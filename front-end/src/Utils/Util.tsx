function myIsalpha(nickname : string) : boolean {
    let first : string = nickname.charAt(0);
    let second : string = nickname.charAt(1);;
    let third : string = nickname.charAt(2);;
     
    let tab : string[] = [first];
    let isalpha : boolean = tab.every((e : any) => (e >= 'A' && e <= 'Z') || (e >= 'a' && e <= 'z'))
    return isalpha;
}

export {myIsalpha};