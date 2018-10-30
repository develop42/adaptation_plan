import psycopg2

conn = psycopg2.connect('dbname=test_project user=postgres password=qwerty12+')

cursor = conn.cursor()
count = cursor.execute("select count(*) from polls_question")
rowcount = cursor.fetchone()[0]

print("Количество объектов в таблице Question: " + str(rowcount))

count2 = cursor.execute("select count(*) from polls_choice")
rowcount2 = cursor.fetchone()[0]
print("Количество объектов в таблице Choice: " + str(rowcount2))

conn.close()
