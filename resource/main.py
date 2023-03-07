from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By


def execute():
    option = webdriver.EdgeOptions()
    option.add_argument("headless")
    driver = webdriver.Edge(options=option)
    url = "http://portal.njnu.edu.cn/portal/index.html"
    driver.get(url)
    user_name = driver.find_element(By.XPATH, "//input[@name='username']")
    password = driver.find_element(By.XPATH, "//input[@name='password']")
    login = driver.find_element(By.XPATH, "//button[@id='submitBtn']")

    user_name.clear()
    password.clear()
    sleep(2)
    # 输入具体密码
    user_name.send_keys('123')
    password.send_keys('123')
    login.click()

    driver.close()


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':
    execute()

# 访问 https://www.jetbrains.com/help/pycharm/ 获取 PyCharm 帮助
