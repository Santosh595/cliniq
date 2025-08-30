const mapRoleToDiscriminator = (role) =>{
    if(!role) role;
    const r = role.toUpperCase();
    if(r === "USER" || r === "PROFILE") return "Profile";
    if(r === "DOCTOR") return "Doctor";
    if(r === "ADMIN") return "Admin";

    return role;
};

export const requireRole = (ctxUser, allowedRoles= []) => {
    if(!ctxUser) throw new Error("Unauthorized");
    if(!allowedRoles || allowedRoles.length === 0) return;
    const userRole = ctxUser.role || ctxUser._doc?.role;

    const normUserRole = mapRoleToDiscriminator(userRole);
    const allowedNormalized = allowedRoles.map(mapRoleToDiscriminator);
    if(!allowedNormalized.includes(normUserRole)){
        throw new Error("Forbidden: insufficient permisions");
    }

};