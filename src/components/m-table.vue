<template>
    <div class="container">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Код кружка<span class="material-icons">unfold_more</span></th>
                <th scope="col">Название кружка<span class="material-icons" @click="sortBycircleName">unfold_more</span>
                </th>
                <th scope="col">Адрес<span class="material-icons" @click="sortBycircleAdress">unfold_more</span></th>
                <th scope="col">Преподаватель<span class="material-icons" @click="sortByName">unfold_more</span></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th><input class="form-control" placeholder="Поиск по названию"></th>
                <th><input v-model="onteach" class="form-control" placeholder="Поиск по названию"></th>
                <th><input v-model="onteach1" class="form-control" placeholder="Введите адрес"></th>
                <th><input v-model="onteach2" class="form-control" placeholder="Введите преподавателя"></th>
            </tr>
            <tr
                    v-for="row in pagineitedUsers"
                    :key="row.id"
                    @click="rovPush(row)"
            >
                <th scope="row">{{row.circleCode}}</th>
                <td>{{row.circleName}}</td>
                <td>{{row.address}}</td>
                <td>{{row.teacher}}</td>

            </tr>
            </tbody>
        </table>

        <div class="page-row">
            <nav aria-label="Page navigation example">
                <ul class="pagination" :class="{'page-pointer': true}">
                    <li
                            class="page-item"
                            @click="prevPages"

                    >
                        <a class="page-link" :class="{'page-disabled': pageNumber == 1 ? true: false}" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item"
                        v-for="page in pages"
                        :key="page"
                        @click="pageChange(page)"
                    ><a
                            class="page-link"
                            :class="{'page-selector':page===pageNumber}"
                    >{{page}}</a></li>
                    <li
                            @click="nextPages"
                    >
                        <a class="page-link" aria-label="Next" :class="{'page-disabled': pageNumber == pages ? true: false}">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="form-group">
            <my-select :valTextarea=texarDate />
        </div>


    </div>
</template>

<script>
    import mySelect from './m-selected'

    export default {
        data() {
            return {
                userPagesPage: 6,
                pageNumber: 1,
                flagName: false,
                BycircleName: false,
                BycircleAdress: false,
                texarDate: {},
                onteach: '',
                onteach1: '',
                onteach2: '',

            }
        },

        props: {
            usersData: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            pages() {
                return Math.ceil(this.filterName.length / 6);
            },
            pagineitedUsers() {
                let from = (this.pageNumber - 1) * this.userPagesPage;
                let to = from + this.userPagesPage;
                return this.filterName.slice(from, to)
            },
            filterName() {
                return this.usersData.filter(name => {
                        if (this.onteach) {
                            return name.circleName.toLowerCase().indexOf(this.onteach.toLowerCase()) !== -1
                        } else if (this.onteach2) {
                            return name.teacher.toLowerCase().indexOf(this.onteach2.toLowerCase()) !== -1
                        } else {
                            return name.address.toLowerCase().indexOf(this.onteach1.toLowerCase()) !== -1
                        }
                    },
                )
            }
        },

        components: {
            mySelect
        },
        methods: {
            pageChange(page) {
                this.pageNumber = page
            },
            nextPages() {
                this.pageNumber !== this.pages ? this.pageNumber += 1 : this.pageNumber = this.pages
            },
            prevPages() {

                //return !this.pageNumber <= 1

               this.pageNumber == 1 ?  this.pageNumber = 1 : this.pageNumber -= 1

            },
            sortByName() {
                let sortA = (a, b) => a.teacher.localeCompare(b.teacher)
                let sortB = (a, b) => b.teacher.localeCompare(a.teacher)

                this.flagName = !this.flagName

                this.usersData.sort(this.flagName ? sortA : sortB)
            },
            sortBycircleName() {
                let sortA = (a, b) => a.circleName.localeCompare(b.circleName)
                let sortB = (a, b) => b.circleName.localeCompare(a.circleName)

                this.BycircleName = !this.BycircleName
                this.usersData.sort(this.BycircleName ? sortA : sortB)
            },
            sortBycircleAdress() {
                let sortA = (a, b) => a.address.localeCompare(b.address)
                let sortB = (a, b) => b.address.localeCompare(a.address)

                this.BycircleAdress = !this.BycircleAdress

                this.usersData.sort(this.BycircleAdress ? sortA : sortB)
            },
            rovPush(val) {
                this.texarDate = val
            },
        }
    }
</script>

<style scoped>
    .page-row {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .page-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

    }
    .page-pointer{
        cursor: pointer;
    }

    .page {
        padding: 7px;
        border: solid 1px #e7e7e7;
        margin-right: 10px;
    }

    .page:hover {
        background: darkgray;
        cursor: pointer;
    }

    .page-selector {
        background: #dee2e6;
        cursor: pointer;
    }

    .table tbody tr:hover {
        background: #dee2e6;
        cursor: pointer;
    }

    .material-icons {
        position: absolute;
        cursor: pointer;
    }
    .page-disabled {
        cursor: not-allowed;
    }

</style>