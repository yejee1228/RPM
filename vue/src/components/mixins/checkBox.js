export const checkBox= {
    data() {
        return {}
    },
    methods: {
        check(checkedItem) {
            checkedItem.checked = !checkedItem.checked
        },
        allcheck(checkedItemList) {
            this.allchecked = !this.allchecked
            for (let i = 0; i < checkedItemList.length; i++) {
                checkedItemList[i].checked = this.allchecked
            }
        },
        updateCheckall( list ) {
            let checknum = 0
            list.forEach(el => {
                if (el.checked == true) {
                    checknum += 1
                }
                if (checknum == list.length) {
                    this.allchecked = true

                } else {
                    this.allchecked = false
                }
            })

        }
    }
}