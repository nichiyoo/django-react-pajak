from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = "api"

urlpatterns = [
    # authentication
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("users/register/", views.CreateUserView.as_view()),
    path("auth/", include("rest_framework.urls")),
    #  laporan
    path("laporan/", views.ListLaporanView.as_view(), name="list"),
    path("laporan/create/", views.CreateLaporanView.as_view(), name="create"),
    path("laporan/<int:pk>/delete/", views.DeleteLaporanView.as_view(), name="delete"),
]
