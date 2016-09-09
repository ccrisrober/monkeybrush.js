
namespace SourceFrags {
    export function parse(str: string): string {
        const regex = /#import +<([\w\d.]+)>/g;
        function replace(match: string, include: string): string {
            const replace = SourceFrags[include];
            if (replace === undefined) {
                throw new Error(`Can not resolve #import <${include}>`);
            }
            return parse(replace);
        }
        return str.replace(regex, replace);
    }
};

export { SourceFrags };
