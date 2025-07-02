import prisma from "../../utils/prisma";
import { TAbout } from "./about.interface";

const About = prisma.about;

// Create a new about entry
const create = async (body: TAbout) => {
    const result = await About.create({
        data: body
    });
    return result;
};

// Update an existing about entry by ID
const update = async (id: string, body: Partial<TAbout>) => {
    const result = await About.update({
        where: { id },
        data: body
    });
    return result;
};

// Delete an about entry by ID
const remove = async (id: string) => {
    const result = await About.delete({
        where: { id }
    });
    return result;
};

// Get an about entry by ID (can return null)
const findUnique = async (id: string) => {
    const result = await About.findUnique({
        where: { id }
    });
    return result;
};
const findFirst = async () => {
    const result = await About.findFirst();
    return result
}
const findFirstElementId = async () => {
    const result = await About.findFirst({
        select: {
            id: true
        }
    });
    return result
}
export const AboutRepositories = {
    create,
    update,
    remove,
    findUnique,
    findFirst,
    findFirstElementId
};