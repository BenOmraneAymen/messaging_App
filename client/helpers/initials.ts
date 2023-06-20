
export default function initials(name:string){
    let initials = name?.toUpperCase().split(" ");
    if (initials) {
      if (initials.length > 1) {
        return initials[0][0] + initials[1][0];
      } else {
        return initials[0][0];
      }
    }
    return "no";
}