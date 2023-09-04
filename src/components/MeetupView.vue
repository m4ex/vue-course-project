<script setup>
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useApi } from '@/composables/useApi';
import { attendMeetup, deleteMeetup, leaveMeetup } from '@/api/meetupsApi';
import { computed } from 'vue';

const props = defineProps({
  meetup: {
    type: Object,
    required: true,
  },
});

// DONE: Добавить обработку кнопок, включая работу с API
const { isAuthenticated } = useAuthStore();

const {
  isLoading: deleteLoading,
  request: deleteRequest,
  result: deleteResult,
} = useApi(deleteMeetup, {
  successToast: 'Митап удалён',
  errorToast: true,
});

const {
  isLoading: attendLoading,
  request: attendRequest,
  result: attendResult,
} = useApi(attendMeetup, {
  successToast: 'Сохранено',
  errorToast: true,
});

const {
  isLoading: leaveLoading,
  request: leaveRequest,
  result: leaveResult,
} = useApi(leaveMeetup, {
  successToast: 'Сохранено',
  errorToast: true,
});

const loading = computed(() => {
  return deleteLoading || attendLoading || leaveLoading;
});

/*
  DONE: Добавить тосты при успешных операциях
        - Митап удалён
        - Сохранено
        - Текст ошибки в случае ошибки на API
 */
// DONE: Будет плюсом блокировать кнопку на время загрузки
</script>

<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <!-- DONE: Добавить проверку на аутентификацию и является ли пользователь организатором митапа -->
          <!-- DONE: Реализовать кнопки (некоторые должны быть ссылками) -->
          <div v-if="isAuthenticated" class="meetup__aside-buttons">
            <!-- DONE: Может добавить тут слот? -->
            <!-- COMMENT: Не понятно зачем тут слот, к чему это?  -->
            <template v-if="meetup.organizing">
              <UiButton
                variant="primary"
                :to="{ name: 'editMeetup', params: { meetupId: meetup.id } }"
                class="meetup__aside-button"
                >Редактировать
              </UiButton>
              <UiButton
                variant="danger"
                class="meetup__aside-button"
                :disabled="loading"
                @click="deleteRequest(meetup.id)"
              >
                Удалить
              </UiButton>
            </template>
            <template v-else>
              <UiButton
                v-if="meetup.attending"
                variant="secondary"
                class="meetup__aside-button"
                :disabled="loading"
                @click="leaveRequest(meetup.id)"
              >
                Отменить участие
              </UiButton>
              <UiButton
                v-else
                variant="primary"
                class="meetup__aside-button"
                :disabled="loading"
                @click="attendRequest(meetup.id)"
              >
                Участвовать
              </UiButton>
            </template>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
