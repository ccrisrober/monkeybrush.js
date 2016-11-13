namespace MBS {
    export class Tags {
        // TODO: USES!
        public static HasTag(o: MBS.Node): boolean {
            if (!o.tag) {
                return false;
            }
            return o.tag.length > 0;
        };
        public static GetTag(o: MBS.Node): string {
            return o.tag;
        }
    };
};
