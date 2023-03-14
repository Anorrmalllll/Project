import os

# функция - набор блоков, которые могут вызываться в программе, могут принимать и возвращать значение (если спросят)


def ViewFiles(path): # просмотр всех файлов в папке
    with os.scandir(path) as files: # вывод всех файлов через список, благодаря встроенной функции
        for file in files:
            print(file.name)

def RenameFile(path): # переименование файла
    print('Введите название файла, который нужно переименовать:')
    name = input() # ввод названия старого файла
    old = path + "/" + name # формирование пути к старому файлу
    print('Введите новое название:')
    name = input() # ввод названия нового файла
    new = path + "/" + name # формирование пути к новому файлу
    os.rename(old, new) # переименование через встроенную функцию

def WriteInFile(path): # запись текста в файл
    print('Введите название файла, в который нужно что-то записать:')
    name = input() # ввод названия файла
    file_name = path + "/" + name # формирование пути к новому файлу
    print('Введите, что нужно записать в файл:')
    file_input = input() # что нужно записать
    with open(file_name, "a") as file: # функция, записывающая что-то в файл, в последнюю строчку
        file.write("\n" + file_input)

def ReadFile(path): # просмотр содержимого файла (txt или другое)
    print('Введите название файла, который требуется прочитать:')
    name = input() # ввод названия файла
    file_name = path + "/" + name # формирование пути к нему
    if(os.path.exists(file_name)): # проверка на то, существует ли файл
        with open(file_name, "r") as file: # просмотр содержимого через встроенную функцию
            line = file.readline()
            while line:
                print(line, end="")
                line = file.readline()
            print()
    else:
        print('Файла не существует')

def CreateFile(path): # создание файла
    print('Введите название создаваемого файла:')
    name = input() # ввод названия создаваемого файла
    file_name = path + "/" + name # формирование пути к нему
    if(os.path.exists(file_name)): # проверка на то, существует ли файл
        print('Файл уже существует')
    else:
        open(file_name, "w") # создание файла
        print('Файл успешно создан')

def DeleteFile(path): # удаление файла
    print('Введите название файла, который нужно удалить:')
    name = input() # ввод названия удаляемого файла
    file_name = path + "/" + name # формирование пути к нему
    if(os.path.exists(file_name)): # проверка на то, существует ли файл
        os.remove((file_name)) # удаление файла
        print('Файл удален')
    else:
        print('Файл не существует')

def SortFiles(path): # сортировка файлов в папке
    sort_list = os.listdir(path) # создание списка из файлов
    print('Выберите требуемую сортировку: \n 1. В алфавитном порядке; \n 2. В обратном порядке.')
    answer = int(input())
    if(answer == 1):
        for file in sorted(sort_list, reverse = False): # цикл, сортирующий в алфавитном порядке
            print(file)
    elif(answer == 2):
        for file in sorted(sort_list, reverse = True): # цикл, сортирующий в обратном алфавитному порядке
            print(file)
    else:
        print('Неверный ввод.')
def Start(): # функция старта программы
    answer = -1
    while(answer != 0): # цикл до ввода нуля
        # далее соответствующие действия
        print('Список возможных действий: ')
        print('1. Посмотреть содержимое директории;')
        print('2. Изменить название;')
        print('3. Создать новый файл;')
        print('4. Чтение файла;')
        print('5. Запись в файл;')
        print('6. Удалить файл;')
        print('7. Сортировка файлов;')
        print('0. Выйти из программы.')
        print('Введите желаемое действие: ')
        answer = int(input())
        # вывод соответствующих функций исходя от ответа пользователя
        if(answer == 1):
            ViewFiles(path)
        elif(answer == 2):
            RenameFile(path)
        elif (answer == 3):
            CreateFile(path)
        elif(answer == 4):
            ReadFile(path)
        elif(answer == 5):
            WriteInFile(path)
        elif (answer == 6):
            DeleteFile(path)
        elif (answer == 7):
            SortFiles(path)

print('Введите путь, по которому будут производится действия:')
path = input()
if(os.path.exists(path)): # проверка на то, существует ли путь
    Start() # запуск функции старта программы
else:
    print('Путь не найден')